/*
  ==============================================================================

    Player.cpp
    Created: 4 Feb 2022 11:56:53am
    Author:  eosdu

  ==============================================================================
*/

#include <JuceHeader.h>
#include "Player.h"

//==============================================================================
Player::Player(juce::AudioFormatManager& _formatManager) : formatManager(_formatManager),
                                                            state(PlayerState::Stopped),
                                                            loopMode(false),
                                                            queEditMode(false),
                                                            hotQues({ 0 })
{
    // In your constructor, you should add any child components, and
    // initialise any special settings that your component needs.

}

Player::~Player()
{
    
};


void Player::prepareToPlay(int samplesPerBlockExpected, double sampleRate)
{
    // Pass the job to the transport source
    //transportSource.prepareToPlay(samplesPerBlockExpected, sampleRate);
    
    // Pass the job to the resample source
    resampleSource.prepareToPlay(samplesPerBlockExpected, sampleRate);
};

void Player::releaseResources()
{
    // Pass the job to the transport source
    transportSource.releaseResources();
};

void Player::getNextAudioBlock(const juce::AudioSourceChannelInfo& bufferToFill)
{
    // If valid source loaded
    if (rdrSrcNotEmpty())
    {
        // Pass the job to the resample source
        resampleSource.getNextAudioBlock(bufferToFill);
    }
    // If not
    else {
        // Clear the buffer and stop
        bufferToFill.clearActiveBufferRegion();
        return;
    }
};


// Function to handle changes in player state
void Player::changeState(PlayerState newState)
{
    // If current state differs from the new one
    if (state != newState)
    {
        // Switch to the new state
        state = newState;

        // Check new state and react
        switch (newState)
        {
        case PlayerState::Stopped:
            // Reset to the start of the track
            transportSource.setPosition(0.0);

            break;

        case PlayerState::Starting:
            // Start playing, will cause the change callback and then switch player to the Playing state
            transportSource.start();

            break;

        case PlayerState::Playing:
            break;

        case PlayerState::Stopping:
            // Stop playback, will cause the change callback and then switch player to the Stoped state
            transportSource.stop();

            break;

        case PlayerState::Pausing:
            // Stop playback, will cause the change callback and the switch player to the Paused state
            transportSource.stop();

            break;

        case PlayerState::Paused:
            break;
        }
    }
};

// Function to check the player state
Player::PlayerState Player::getState() const
{
    return state;
};

bool Player::openFile(juce::URL audioURL)
{
    // Attempt to create a reader for the passed URL
    auto* fReader = formatManager.createReaderFor(audioURL.createInputStream(false));

    // If selected file has supported format and reader succesfully created
    if (fReader != nullptr)
    {
        // Create new ReaderSource object from the reader and prepare pointer
        std::unique_ptr<juce::AudioFormatReaderSource> newSource =
            std::make_unique<juce::AudioFormatReaderSource>(fReader, true);

        // Pass newSource to the transport source
        transportSource.setSource(newSource.get(), 0, nullptr, fReader -> sampleRate);

        /* Transfer ownership of the new Audio Format Reader Source
            from the newSource to the readerSource, when newSource releases pointer */
        readerSource.reset(newSource.release());

        // Signal success and exit
        return true;
    }

    // Signal error
    return false;
};

// Get access to the transport source
juce::AudioTransportSource* Player::getTransportSource() 
{
    return &transportSource;
};

// Check that reader source is not empty
bool Player::rdrSrcNotEmpty() const
{
    // If reader source is not empty, return true
    if (readerSource.get() != nullptr)
        return true;

    // Else, return false
    return false;
};

// Set new volume value
void Player::setGain(float newValue)
{
    // Limit gain rage from 0 to 300%, if out of range
    if (newValue < 0.0f || newValue > 3.0f)
    {
        // Message and break
        DBG("Gain argument is out of range. Should be between 0.0f and 3.0f!");
        return;
    }
    // If value is valid, set new gain
    transportSource.setGain(newValue);
};

// Set relative position
void Player::setPosRel(float relStamp)
{
    // Check if argument is out of range
    if (relStamp < 0.0f || relStamp > 1.0f)
    {
        // Message and break
        DBG("Relative timestamp is out of range. Should be between 0.0f and 1.0f!");
        return;
    }

    // If value is valid, calculate the timestamp based on the relative position
    float timeStamp = relStamp * transportSource.getLengthInSeconds();

    // Set this position
    setPos(timeStamp);

};

// Get relative position
double Player::getPosRel() const
{
    // To prevent division by 0 we check that track length is not zero
    if (transportSource.getLengthInSeconds() != 0)
    {
        return transportSource.getCurrentPosition() / transportSource.getLengthInSeconds();
    }

    // If transport source length is 0
    return 0.0;
};

// Set position in seconds
void Player::setPos(float timeStamp)
{
    // Check if argument is out of range
    if (timeStamp < 0.0f || timeStamp > transportSource.getLengthInSeconds())
    {
        // Message and break
        DBG("Timestamp is out of range. Should be between 0 and track length in seconds!");
        return;
    }

    // If value is valid, set player to the new position
    transportSource.setPosition(timeStamp);
};

// Set tempo
void Player::setTempo(double tempo)
{
    // Check if argument is out of range (tempo between 10% and 800%)
    if (tempo < 0.1 || tempo > 8.0)
    {
        // Message and break
        DBG("Tempo is out of range. Should be between 0 and 8!");
        return;
    }

    // If value is valid, set player to the new position
    resampleSource.setResamplingRatio(tempo);
};

// Get loop state
bool Player::isLooping() const
{
    // Check that reader source exists
    if (rdrSrcNotEmpty())
    {
        // Get looping state
        return readerSource -> isLooping();
    }

    // If no reader exists, then no looping
    return false;
};

// Set loop state
void Player::setLooping(bool willLoop)
{
    // Set new player state
    loopMode = willLoop;

    // Check that reader source exists
    if (rdrSrcNotEmpty())
    {
        // Enable input source looping if true, disable if false
        readerSource -> setLooping(willLoop);
    }
};

// Set edit mode state
void Player::setQueEdit(bool isEditable)
{
    // Set new player state
    queEditMode = isEditable;
};

// Get edit mode state
bool Player::getQueEdit() const
{
    return queEditMode;
};

// Set hot que relative position
void Player::setHotQue(int ind, double timestamp)
{
    // If index argument is invalid print error msg and stop
    if (ind < 0 || ind > hotQues.size() - 1 )
    {
        DBG("HOT QUE INDEX IS OUT OF RANGE!");
        return;
    }
    
    // If timestamp argument is invalid print error msg and stop
    if (timestamp < 0 || timestamp > transportSource.getLengthInSeconds())
    {
        DBG("HOT QUE TIMESTAMP IS OUT OF RANGE!");
        return;
    }

    // Store timestamp
    hotQues[ind] = timestamp;
};

// Get hot que timestamp
double Player::getHotQue(int ind) const
{
    // If index argument is invalid print error msg and stop
    if (ind < 0 || ind > hotQues.size() - 1)
    {
        DBG("HOT QUE INDEX IS OUT OF RANGE!");
        return 0.0;
    }

    // Get timestamp
    return hotQues[ind];
};