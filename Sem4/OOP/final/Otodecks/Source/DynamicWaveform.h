/*
  ==============================================================================

    DynamicWaveform.h
    Created: 6 Mar 2022 2:43:07pm
    Author:  eosdu

  ==============================================================================
*/

#pragma once

#include <JuceHeader.h>

//==============================================================================
/*
*/
class DynamicWaveform  : public juce::Component
{
public:
    DynamicWaveform();
    ~DynamicWaveform() override;

    void paint (juce::Graphics&) override;
    void resized() override;

    // Paint helper functions
    void paintIfLoaded(juce::Graphics& g);
    void paintIfEmpty(juce::Graphics& g);

    // Set track BPM to adjust graphics
    void setTrackBPM(const double newBpm);

    // Get track BPM
    const double getTrackBPM() const;

    // Set audio thumb to draw waveforms
    void setAudioThumb(juce::AudioThumbnail* newAudioThumb);

    // Set current time
    void setCurTime(const double newTime);

    // Set new visible range
    void setVisRange(juce::Range<double> newRange);

    // Initialize range based on the new track
    void initRange();

    // Update visible range
    void updateVisRange();

private:

    juce::AudioThumbnail* audioThumb;

    double curTime;

    juce::Range<double> visibleRange;

    unsigned int visibleTimeSpread;

    double bpm;

    JUCE_DECLARE_NON_COPYABLE_WITH_LEAK_DETECTOR (DynamicWaveform)
};
