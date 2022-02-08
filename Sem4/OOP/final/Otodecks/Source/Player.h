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

    // Make transport source public, so GUI can attach listener
    //juce::AudioTransportSource transportSource;
    juce::AudioTransportSource* getTransportSource();


    //==================================================================

    

private:

    juce::AudioTransportSource transportSource;
    juce::AudioFormatManager& formatManager;
    std::unique_ptr<juce::AudioFormatReaderSource> readerSource;
    PlayerState state;




    JUCE_DECLARE_NON_COPYABLE_WITH_LEAK_DETECTOR (Player)
};
