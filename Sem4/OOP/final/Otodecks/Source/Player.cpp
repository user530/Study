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
                                                            state(PlayerState::Stopped)
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
    transportSource.prepareToPlay(samplesPerBlockExpected, sampleRate);
};

void Player::releaseResources()
{
    // Pass the job to the transport source
    transportSource.releaseResources();
};

void Player::getNextAudioBlock(const juce::AudioSourceChannelInfo& bufferToFill)
{
    // If valid source loaded
    if (readerSource.get() != nullptr)
    {
        // Pass the job to the transport source
        transportSource.getNextAudioBlock(bufferToFill);
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
        transportSource.setSource(newSource.get(), 0, nullptr, fReader->sampleRate);

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