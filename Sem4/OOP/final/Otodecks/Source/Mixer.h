/*
  ==============================================================================

    Mixer.h
    Created: 4 Feb 2022 11:58:36am
    Author:  eosdu

  ==============================================================================
*/

#pragma once

#include <JuceHeader.h>

//==============================================================================
/*
*/
class Mixer  : public juce::Component
{
public:
    Mixer();
    ~Mixer() override;

    void paint (juce::Graphics&) override;
    void resized() override;

private:
    JUCE_DECLARE_NON_COPYABLE_WITH_LEAK_DETECTOR (Mixer)
};
