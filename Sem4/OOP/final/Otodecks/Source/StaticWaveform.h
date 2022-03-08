/*
  ==============================================================================

    StaticWaveform.h
    Created: 6 Mar 2022 2:42:25pm
    Author:  eosdu

  ==============================================================================
*/

#pragma once

#include <JuceHeader.h>

//==============================================================================
/*
*/
class StaticWaveform  : public juce::Component
{
public:
    StaticWaveform();
    ~StaticWaveform() override;

    void paint (juce::Graphics&) override;
    void resized() override;

    // Paint helper functions
    void paintIfLoaded(juce::Graphics& g);
    void paintIfEmpty(juce::Graphics& g);


    // Set audio thumb to draw waveforms
    void setAudioThumb(juce::AudioThumbnail* newAudioThumb);

    // Set current time
    void setCurTime(const double newTime);

    // Set current position
    void setCurPos(const double newPos);

    // Set track name
    void setTrackName(const juce::String newTrackName);

    // Set track length
    void setTrackLength(const int maxLen);

    // Return playback time as a string
    const juce::String getTimeString(const double curTime) const;

private:

    juce::AudioThumbnail* audioThumb;

    double curTime;

    double curPos;

    juce::String trackName;

    juce::String trackLength;

    juce::String timeString;

    JUCE_DECLARE_NON_COPYABLE_WITH_LEAK_DETECTOR (StaticWaveform)
};
