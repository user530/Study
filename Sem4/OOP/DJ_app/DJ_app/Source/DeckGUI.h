/*
  ==============================================================================

    DeckGUI.h
    Created: 26 Jan 2022 11:26:20am
    Author:  eosdu

  ==============================================================================
*/

#pragma once

#include <JuceHeader.h>
#include "DJAudioPlayer.h"
#include "WaveformDisplay.h"

//==============================================================================
/*
*/
class DeckGUI  : public juce::Component,
                 public juce::Button::Listener,
                 public juce::Slider::Listener,
                 public juce::FileDragAndDropTarget,
                 public juce::Timer
{
public:
    DeckGUI(DJAudioPlayer* player,
            juce::AudioFormatManager& formatManagerToUse,
            juce::AudioThumbnailCache& cacheToUse);
    ~DeckGUI() override;

    void paint (juce::Graphics&) override;
    void resized() override;

    /** Implement Button::Listener */
    void buttonClicked(juce::Button*) override;

    /** Implement Slider::Listener */
    void sliderValueChanged(juce::Slider*) override;

    /** Implement FileDragAndDrop */
    bool isInterestedInFileDrag(const juce::StringArray& files) override;

    void filesDropped(const juce::StringArray& files, int x, int y) override;

    // Implement timer
    void timerCallback() override;

private:


    juce::TextButton playButton{ "PLAY" };
    juce::TextButton stopButton{ "STOP" };
    juce::TextButton loadFile{ "LOAD FILE" };
    juce::Slider volSlider;
    juce::Slider speedSlider;
    juce::Slider timeSlider;

    // Pointer to the player
    DJAudioPlayer* player;

    // WaveformDisplay component
    WaveformDisplay waveformDisplay;


    JUCE_DECLARE_NON_COPYABLE_WITH_LEAK_DETECTOR (DeckGUI)
};
