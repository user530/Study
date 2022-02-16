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
class FileBrowser  : public juce::Component,
                     public juce::FileBrowserListener
{
public:
    FileBrowser();
    ~FileBrowser() override;

    void paint (juce::Graphics&) override;
    void resized() override;

private:

    juce::TimeSliceThread browserThread{ "File Browser" };
    juce::DirectoryContentsList contentList{ nullptr, browserThread };
    juce::FileTreeComponent fileTree{ contentList };
    juce::URL selectedFile;

    // Inherited from the base class FileBrowserListener
    virtual void selectionChanged() override;
    virtual void fileClicked(const juce::File& file, const juce::MouseEvent& e) override;
    virtual void fileDoubleClicked(const juce::File& file) override;
    virtual void browserRootChanged(const juce::File& newRoot) override;


    JUCE_DECLARE_NON_COPYABLE_WITH_LEAK_DETECTOR (FileBrowser)
};
