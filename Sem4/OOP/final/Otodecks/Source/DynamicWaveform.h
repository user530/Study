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

private:
    JUCE_DECLARE_NON_COPYABLE_WITH_LEAK_DETECTOR (DynamicWaveform)
};
