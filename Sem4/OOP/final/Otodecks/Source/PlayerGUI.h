/*
  ==============================================================================

    PlayerGUI.h
    Created: 4 Feb 2022 11:57:30am
    Author:  eosdu

  ==============================================================================
*/

#pragma once

#include <JuceHeader.h>

//==============================================================================
/*
*/
class PlayerGUI  : public juce::Component
{
public:
    PlayerGUI();
    ~PlayerGUI() override;

    void paint (juce::Graphics&) override;
    void resized() override;

private:
    JUCE_DECLARE_NON_COPYABLE_WITH_LEAK_DETECTOR (PlayerGUI)
};
