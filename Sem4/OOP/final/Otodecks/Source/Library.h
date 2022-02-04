/*
  ==============================================================================

    Library.h
    Created: 4 Feb 2022 12:00:01pm
    Author:  eosdu

  ==============================================================================
*/

#pragma once

#include <JuceHeader.h>

//==============================================================================
/*
*/
class Library  : public juce::Component
{
public:
    Library();
    ~Library() override;

    void paint (juce::Graphics&) override;
    void resized() override;

private:
    JUCE_DECLARE_NON_COPYABLE_WITH_LEAK_DETECTOR (Library)
};
