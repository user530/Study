/*
  ==============================================================================

    Library.h
    Created: 4 Feb 2022 12:00:01pm
    Author:  eosdu

  ==============================================================================
*/

#pragma once

#include <JuceHeader.h>
#include "FileBrowser.h"

//==============================================================================
/*
*/
class Library  : public juce::Component,
                    public juce::FileBrowserListener,
                    public juce::TableListBoxModel
{
public:
    Library(FileBrowser*);
    ~Library() override;

    void paint (juce::Graphics&) override;
    void resized() override;

private:

    // Inherited from the base class FileBrowserListener
    virtual void selectionChanged() override;
    virtual void fileClicked(const juce::File& file, const juce::MouseEvent& e) override;
    virtual void fileDoubleClicked(const juce::File& file) override;
    virtual void browserRootChanged(const juce::File& newRoot) override;

    // Inherited from the base class TableListBoxModel
    virtual int getNumRows() override;
    virtual void paintRowBackground(juce::Graphics&, 
                                    int rowNumber, 
                                    int width, 
                                    int height, 
                                    bool rowIsSelected) override;
    virtual void paintCell(juce::Graphics&, 
                            int rowNumber, 
                            int columnId, 
                            int width, 
                            int height, 
                            bool rowIsSelected) override;


    // Setup XML library template 
    void libTemplate(juce::XmlElement* emptyLib);

    // Add file from the file tree to the library
    void addTrackToLib(const juce::File& file);

    // Make XML entry to the current library
    void makeLibEntry(const juce::StringArray params);



    // File browser component
    FileBrowser* fileBrowser;

    // Library data collection
    juce::Array<juce::URL> library;

    // Library table component
    juce::TableListBox libTable;
    // Library table font
    juce::Font tableFont{ 12.0f };

    // Current library xml
    juce::XmlElement curLibrary{ "OTODECKS_LIBRARY" };

    // Library structure xml element
    juce::XmlElement* libStructure = nullptr;
    // Library entries xml element
    juce::XmlElement* libEntries = nullptr;


    // Library file
    juce::File libFile{};





    JUCE_DECLARE_NON_COPYABLE_WITH_LEAK_DETECTOR (Library)
};
