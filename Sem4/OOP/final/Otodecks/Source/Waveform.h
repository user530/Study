/*
  ==============================================================================

    Waveform.h
    Created: 4 Feb 2022 11:57:59am
    Author:  eosdu

  ==============================================================================
*/

#pragma once

#include <JuceHeader.h>

//==============================================================================
/*
*/
class Waveform : public juce::Component
{
public:
    Waveform(juce::AudioFormatManager& formatManagerAdr,
             juce::AudioThumbnailCache& thumbCacheAdr);
    ~Waveform() override;

    void paint (juce::Graphics&) override;
    void resized() override;

    // Paint helper functions
    void paintIfLoaded(juce::Graphics& g);
    void paintIfEmpty(juce::Graphics& g);
    
    // Updaet playhead position
    void setRelPos(double relPos);

    // Get access to the audio thumbnail, so GUI can attach listener
    juce::AudioThumbnail* getAudioThumb();

private:
    juce::AudioThumbnail audioThumb;

    double curPos;

    // Background color
    juce::Colour bgCol = getLookAndFeel().findColour(juce::ResizableWindow::backgroundColourId);

    JUCE_DECLARE_NON_COPYABLE_WITH_LEAK_DETECTOR (Waveform)
};
