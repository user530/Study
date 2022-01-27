/*
  ==============================================================================

    WaveformDisplay.h
    Created: 26 Jan 2022 6:33:06pm
    Author:  eosdu

  ==============================================================================
*/

#pragma once

#include <JuceHeader.h>

//==============================================================================
/*
*/
class WaveformDisplay  : public juce::Component,
                         public juce::ChangeListener
{
public:
    WaveformDisplay(juce::AudioFormatManager& formatManagerToUse,
                    juce::AudioThumbnailCache& cacheToUse);
    ~WaveformDisplay() override;

    void paint (juce::Graphics&) override;
    void resized() override;
    void loadURL(juce::URL fileURL);

    void changeListenerCallback(juce::ChangeBroadcaster* source) override;

private:
    juce::AudioThumbnail audioThumb;
    bool fileLoaded;

    JUCE_DECLARE_NON_COPYABLE_WITH_LEAK_DETECTOR (WaveformDisplay)
};
