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
    
    // Update playhead position
    void setRelPos(double relPos);

    // Set track name
    void setTrackName(const juce::String name);

    // Set track length
    void setTrackLength(const int maxLen);

    // Set current time
    void setCurTime(const double newTime);

    // Get time string
    const juce::String getTimeString(const double curTime) const;

    // Get access to the audio thumbnail, so GUI can attach listener
    juce::AudioThumbnail* getAudioThumb();

    // Update visible range
    void updateVisRange();


    // Override  functions from the Component base class

    // Called when a mouse button is pressed
    void mouseDown(const juce::MouseEvent& e) override;
    // Called when a mouse button is released
    void mouseUp(const juce::MouseEvent& e) override;
    // Called when the mouse is moved while a button is held down
    void mouseDrag(const juce::MouseEvent& e) override;

    //==============================================================================

private:
    juce::AudioThumbnail audioThumb;

    juce::Range<double> visibleRange;

    double curPos;

    juce::String trackName;

    juce::String trackLength;

    double curTime;

    // Set new visible range
    void setVisRange(juce::Range<double> newRange);

    // Background color
    juce::Colour bgCol = getLookAndFeel().findColour(juce::ResizableWindow::backgroundColourId);

    JUCE_DECLARE_NON_COPYABLE_WITH_LEAK_DETECTOR (Waveform)
};
