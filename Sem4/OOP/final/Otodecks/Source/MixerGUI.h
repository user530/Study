/*
  ==============================================================================

    MixerGUI.h
    Created: 4 Feb 2022 11:58:54am
    Author:  eosdu

  ==============================================================================
*/

#pragma once

#include <JuceHeader.h>

//==============================================================================
/*
*/
class MixerGUI  : public juce::Component
{
public:
    MixerGUI();
    ~MixerGUI() override;

    void paint (juce::Graphics&) override;
    void resized() override;

private:
    JUCE_DECLARE_NON_COPYABLE_WITH_LEAK_DETECTOR (MixerGUI)
};
