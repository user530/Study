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
class Waveform  : public juce::Component
{
public:
    Waveform();
    ~Waveform() override;

    void paint (juce::Graphics&) override;
    void resized() override;

private:
    JUCE_DECLARE_NON_COPYABLE_WITH_LEAK_DETECTOR (Waveform)
};
