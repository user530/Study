/*
  ==============================================================================

    FileBrowser.h
    Created: 4 Feb 2022 11:59:45am
    Author:  eosdu

  ==============================================================================
*/

#pragma once

#include <JuceHeader.h>

//==============================================================================
/*
*/
class FileBrowser  : public juce::Component
{
public:
    FileBrowser();
    ~FileBrowser() override;

    void paint (juce::Graphics&) override;
    void resized() override;

private:
    JUCE_DECLARE_NON_COPYABLE_WITH_LEAK_DETECTOR (FileBrowser)
};
