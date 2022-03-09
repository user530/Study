/*
  ==============================================================================

    Waveform.h
    Created: 4 Feb 2022 11:57:59am
    Author:  eosdu

  ==============================================================================
*/

#pragma once

#include <JuceHeader.h>
#include "StaticWaveform.h"
#include "DynamicWaveform.h"

//==============================================================================
/*
*/
class Waveform : public juce::Component
{
public:
    Waveform(juce::AudioFormatManager& formatManagerAdr,
             juce::AudioThumbnailCache& thumbCacheAdr,
                        StaticWaveform* statWaveform,
                        DynamicWaveform* dynWaveform);
    ~Waveform() override;

    void paint (juce::Graphics&) override;
    void resized() override;

    // Update waveforms
    void updateWaveforms();

    // Update playhead position
    void setRelPos(double relPos);

    // Set track name
    void setTrackName(const juce::String name);

    // Set track BPM
    void setTrackBPM(const double bpm);

    // Get track BPM
    const double getTrackBPM() const;

    // Set track length
    void setTrackLength(const int maxLen);

    // Set current time
    void setCurTime(const double newTime);

    // Set new audio thumb to the static and dynamic audio thumb
    void setNewThumb();

    // Get access to the audio thumbnail, so GUI can attach listener
    juce::AudioThumbnail* getAudioThumb();

    // Callback to update the visible range of the dynamic waveform
    void updateVisRange();                                            

private:
    juce::AudioThumbnail audioThumb;

    StaticWaveform* statWaveform;

    DynamicWaveform* dynWaveform;

    double curPos;

    double curTime;

    JUCE_DECLARE_NON_COPYABLE_WITH_LEAK_DETECTOR (Waveform)
};
