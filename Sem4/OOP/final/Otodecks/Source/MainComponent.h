#pragma once

#include <JuceHeader.h>
#include "PlayerGUI.h"
#include "Waveform.h"
#include "MixerGUI.h"
#include "FileBrowser.h"
#include "Library.h"

//==============================================================================
/*
    This component lives inside our window, and this is where you should put all
    your controls and content.
*/
class MainComponent  : public juce::AudioAppComponent
{
public:
    //==============================================================================
    MainComponent();
    ~MainComponent() override;

    //==============================================================================
    void prepareToPlay (int samplesPerBlockExpected, double sampleRate) override;
    void getNextAudioBlock (const juce::AudioSourceChannelInfo& bufferToFill) override;
    void releaseResources() override;

    //==============================================================================
    void paint (juce::Graphics& g) override;
    void resized() override;


private:
    //==============================================================================
    // Your private member variables go here...

    // Universal format manager
    juce::AudioFormatManager formatManager;

    // Mixer object to handle 2 players
    juce::MixerAudioSource mixerSource;


    // Player components
    Player player1{ formatManager };
    Player player2{ formatManager };

    // Player GUI
    PlayerGUI player1GUI{ &player1 };
    PlayerGUI player2GUI{ &player2 };

    // Waveform interface
    Waveform waveform1;
    Waveform waveform2;

    // Mixer GUI
    MixerGUI mixerGUI;

    // File browser interface
    FileBrowser fileBrowser;

    // Library interface
    Library library;


    JUCE_DECLARE_NON_COPYABLE_WITH_LEAK_DETECTOR (MainComponent)
};
