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

private:
    JUCE_DECLARE_NON_COPYABLE_WITH_LEAK_DETECTOR (StaticWaveform)
};
