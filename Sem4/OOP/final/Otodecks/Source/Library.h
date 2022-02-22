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
                    public juce::TableListBoxModel,
                    public juce::DragAndDropContainer
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

    //===================================================================

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

    // This callback is made when the user clicks on one of the cells in the table
    virtual void cellClicked(int rowNumber, int columnId, const juce::MouseEvent&);

    // This callback is made when the table's sort order is changed        
    virtual void sortOrderChanged(int newSortColumnId, bool isForwards);

    // Override this to be informed when the delete key is pressed
    virtual void deleteKeyPressed(int lastRowSelected);
      
    // To allow rows from your table to be dragged - and -dropped, implement this method
    virtual juce::var getDragSourceDescription(const juce::SparseSet< int >& currentlySelectedRows);

    //===================================================================

    // Comparator class used to sort data in table 
    // (from the WidgetsDemo from the base JUCE demo collection)
    class DemoDataSorter
    {
    public:
        DemoDataSorter(const juce::String& attributeToSortBy, bool forwards)
                        : attributeToSort(attributeToSortBy),
                          direction(forwards ? 1 : -1)
        {
        }

        int compareElements(juce::XmlElement* first, juce::XmlElement* second) const
        {
            auto result = first->getStringAttribute(attributeToSort)
                .compareNatural(second->getStringAttribute(attributeToSort));

            if (result == 0)
                result = first->getStringAttribute("ID")
                .compareNatural(second->getStringAttribute("ID"));

            return direction * result;
        }

    private:
        juce::String attributeToSort;
        int direction;
    };



    //===================================================================

    // Setup XML library template 
    void libTemplate(juce::XmlElement* emptyLib);

    // Add file from the file tree to the library
    void addTrackToLib(const juce::File& file);

    // Make XML entry to the current library
    void makeLibEntry(const juce::StringArray params);

    // File browser component
    FileBrowser* fileBrowser;

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
