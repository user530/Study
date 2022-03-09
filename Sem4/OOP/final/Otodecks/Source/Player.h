/*
  ==============================================================================

    Player.h
    Created: 4 Feb 2022 11:56:53am
    Author:  eosdu

  ==============================================================================
*/

#pragma once

#include <JuceHeader.h>


//==============================================================================


//==============================================================================
/*
*/
class Player  : public juce::AudioSource       // Work with audio
{               
public:
    Player(juce::AudioFormatManager&);
    ~Player() override;

    //==================================================================

    // All available player states
    enum class PlayerState
    {
        Stopped,
        Starting,
        Playing,
        Stopping,
        Pausing,
        Paused
    };

    //==================================================================

    // Override pure virtual functions from the AudioSource parent class
    virtual void prepareToPlay(int samplesPerBlockExpected, double sampleRate) override;

    virtual void releaseResources() override;

    virtual void getNextAudioBlock(const juce::AudioSourceChannelInfo& bufferToFill) override;

    //==================================================================

    // Function to handle changes in player state
    void changeState(PlayerState newState);

    // Function to check the player state
    PlayerState getState() const;

    // Open file
    bool openFile(juce::URL audioURL);

    // Get access to the transport source, so GUI can attach listener
    juce::AudioTransportSource* getTransportSource();

    // Check that reader source is not empty
    bool rdrSrcNotEmpty() const;

    // Set new volume value
    void setGain(float newValue);

    // Set relative position
    void setPosRel(float relStamp);

    // Get relative position
    double getPosRel() const;

    // Set position in seconds
    void setPos(float timeStamp);

    // Set tempo
    void setTempo(double tempo);

    // Get tempo
    const double getTempo() const;
    
    // Get loop state
    bool isLooping() const;

    // Set loop state
    void setLooping(bool willLoop);

    // Set edit mode
    void setQueEdit(bool isEditable);

    // Get edit mode
    bool getQueEdit() const;

    // Set hot que
    void setHotQue(int ind, double timestamp);

    // Get hot que timestamp
    double getHotQue(int ind) const;

private:

    juce::AudioTransportSource transportSource;
    juce::AudioFormatManager& formatManager;
    std::unique_ptr<juce::AudioFormatReaderSource> readerSource; 
    juce::ResamplingAudioSource resampleSource{&transportSource, false, 2};
    PlayerState state;

    // Loop mode
    bool loopMode;

    // Hot que edit mode
    bool queEditMode;

    // Hot que's data storage
    std::array<double, 8> hotQues;


    JUCE_DECLARE_NON_COPYABLE_WITH_LEAK_DETECTOR (Player)
};
