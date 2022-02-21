/*
  ==============================================================================

    Library.cpp
    Created: 4 Feb 2022 12:00:01pm
    Author:  eosdu

  ==============================================================================
*/

#include <JuceHeader.h>
#include "Library.h"

//==============================================================================
Library::Library(FileBrowser* _fileBrowser) : fileBrowser(_fileBrowser)
{
    // In your constructor, you should add any child components, and
    // initialise any special settings that your component needs.
    
    // Setup initial library structure
    libTemplate(&curLibrary);

    // Set shortcut pointers
    libStructure = curLibrary.getChildByName("STRUCTURE");
    libEntries = curLibrary.getChildByName("ENTRIES");

    // Create new lib file
    libFile = juce::File::getCurrentWorkingDirectory().getChildFile("Lib.oto");
    libFile.create();


    // Make table visible
    addAndMakeVisible(libTable);
    // Change table model to our component
    libTable.setModel(this);

    // Set columns (we dont need to show last URL column, so shorten col number by 1)
    for (int i = 0; i < curLibrary.getFirstChildElement()->getNumChildElements() - 1; ++i)
    {
        // Get column name
        juce::String colName = libStructure->getChildElement(i)->getAttributeValue(1);

        // Prepare column width variable
        int colW = 100;

        // For ID and Track columns, we use separate column width
        if (colName == "ID")
            colW = 40;
        else if (colName == "Track")
            colW = 200;

        // Add columns for each attribute of the library structure
        libTable.getHeader().addColumn(colName, i + 1, colW);
    }

    // Make auto stretch, to fill all provided space
    libTable.getHeader().setStretchToFitActive(true);


    // Add listener to the file browser
    ( fileBrowser -> getFiletree() ) -> addListener(this);
}

Library::~Library()
{
}

void Library::paint (juce::Graphics& g)
{
    /* This demo code just fills the component's background and
       draws some placeholder text to get you started.

       You should replace everything in this method with your own
       drawing code..
    */

    g.fillAll (getLookAndFeel().findColour (juce::ResizableWindow::backgroundColourId));   // clear the background

    g.setColour (juce::Colours::grey);
    g.drawRect (getLocalBounds(), 1);   // draw an outline around the component

    g.setColour (juce::Colours::white);
    g.setFont (14.0f);
    g.drawText ("Library", getLocalBounds(),
                juce::Justification::centred, true);   // draw some placeholder text
}

void Library::resized()
{
    // This method is where you should set the bounds of any child
    // components that your component contains..
    
    // Library table position
    libTable.setBounds(0, getHeight() * 0.15, getWidth(), getHeight() * 0.85);
    
}

//===================================================================

// Callback when the user selects a different file in the browser
void Library::selectionChanged() {};

// Callback when the user clicks on a file in the browser
void Library::fileClicked(const juce::File& file, const juce::MouseEvent& e) {};

// Callback when the user double-clicks on a file in the browser
void Library::fileDoubleClicked(const juce::File& file)
{
    // Add file to the library
    addTrackToLib(file);

    // Update library table
    libTable.updateContent();
};

// Callback when the browser's root folder changes
void Library::browserRootChanged(const juce::File& newRoot) {};

//===================================================================

// Setup XML library template 
void Library::libTemplate(juce::XmlElement* emptyLib)
{
    // If empty pointer is passed
    if (emptyLib == nullptr)
    {
        // Message and terminate
        DBG("Library::libTemplate - ERROR! Empty pointer passed!");
        return;
    }

    // Store initial structure to the XML element for future use
    emptyLib->addChildElement(new juce::XmlElement{ "STRUCTURE" });
    emptyLib->addChildElement(new juce::XmlElement{ "ENTRIES" });
    
    // Prepare all column names
    juce::StringArray columns{ "ID", "Track", "Artist", "Album", "Genre", "Length", "BPM", "Key", "URL"};
    
    // Get easy access to the structure child element
    juce::XmlElement* structure = emptyLib->getFirstChildElement();

    // Setup structure based on the column names, default width=50
    for (int i = 0; i < columns.size(); ++i)
    {  
        // Create new element
        juce::XmlElement* newCol = new juce::XmlElement{ "COL" };

        // Set column id
        newCol->setAttribute("col_id", i+1);
        // Set column name
        newCol->setAttribute("name", columns[i]);
        // Set column width
        newCol->setAttribute("width", 50);

        // Add column element
        structure->addChildElement(newCol);
    }
};

// Make XML entry to the current library
void Library::makeLibEntry(const juce::StringArray params)
{
    // Create new entry element
    juce::XmlElement* newEntry = new juce::XmlElement{ "ENTRY" };

    // Get easy access to the structure child element
    juce::XmlElement* structure = curLibrary.getFirstChildElement();

    // If argument array is the different size
    if (structure->getNumChildElements() != params.size())
    {
        // Print error and stop execution
        DBG("Library::makeLibEntry - Error! Number of parameters doesn't match the data structure!");
        return;
    }

    // Iterate over all columns
    for (int i = 0; i < structure->getNumChildElements(); ++i)
    {
        // Column name
        juce::String colName = structure->getChildElement(i)->getAttributeValue(1);

        // Set passed value as column value
        newEntry->setAttribute(colName,params[i]);
    }

    // Add new entry to the current library
    curLibrary.getChildByName("ENTRIES")->addChildElement(newEntry);
};

// Add file from the file tree to the library
void Library::addTrackToLib(const juce::File& file)
{
    // If file has invalid format
    if (file.getFileExtension() != ".mp3" &&
        file.getFileExtension() != ".wav;" &&
        file.getFileExtension() != ".aif")
    {
        // Print message and stop execution
        DBG("Library::addTrackToLib - ERROR! UNSUPPORTED FILE FORMAT!");
        return;
    }
    // If empty file passed
    else if (file == juce::File{})
    {
        // Print message and stop execution
        DBG("Library::addTrackToLib - ERROR! EMPTY FILE PASSED!");
        return;
    }
    // If everything is fine
    else 
    {
        // Prepare params
        juce::StringArray params{ juce::String{ curLibrary
                                                .getChildByName("ENTRIES")
                                                ->getNumChildElements() + 1 },
                                    file.getFileNameWithoutExtension(),
                                    "#Artist",
                                    "#Album",
                                    "#Genre",
                                    "#Length",
                                    "#BPM",
                                    "#Key",
                                    file.getFullPathName()};

        // Make entry based on the passed data
        makeLibEntry(params);
     
        // SAVE CHANGES                                                        // DELETE
        curLibrary.writeTo(libFile);
    }
};

//===================================================================

// This must return the number of rows currently in the table
int Library::getNumRows()
{
    return curLibrary.getChildByName("ENTRIES")->getNumChildElements();
};

// This must draw the background behind one of the rows in the table
void Library::paintRowBackground(juce::Graphics& g,
                                    int rowNumber,
                                    int width,
                                    int height,
                                    bool rowIsSelected)
{
    if (rowIsSelected)
    {
        g.fillAll(juce::Colours::orange);
    }
    else {
        g.fillAll(getLookAndFeel().findColour(juce::ResizableWindow::backgroundColourId));
    }
};

// This must draw one of the cells
void Library::paintCell(juce::Graphics& g,
                            int rowNumber,
                            int columnId,
                            int width,
                            int height,
                            bool rowIsSelected)
{
    // Set font
    g.setColour(juce::Colours::white);
    g.setFont(tableFont);

    if (juce::XmlElement* entryP = libEntries->getChildElement(rowNumber))
    {
        // Get data from the cell based on the col id
        juce::String cellData = entryP->getAttributeValue(columnId-1);

        // Draw cell data
        g.drawText(cellData, 2, 0, width - 4, height, juce::Justification::centredRight);
    }

};

// This callback is made when the user clicks on one of the cells in the table
void Library::cellClicked(int rowNumber, int columnId, const juce::MouseEvent&)
{
    DBG(libTable.getLastRowSelected());
    DBG("CLICKED " + std::to_string(rowNumber) + " ROW, " + std::to_string(columnId) + " COL");
    
};

// This callback is made when the table's sort order is changed        
void Library::sortOrderChanged(int newSortColumnId, bool isForwards) 
{
    // Setup sorter based on the column name and search direction
    DemoDataSorter sorter(libEntries->
                            getFirstChildElement()->
                                getAttributeName(newSortColumnId - 1), isForwards);

    // Sort entries
    libEntries->sortChildElements(sorter);

    // Update library table
    libTable.updateContent();
};

// Override this to be informed when the delete key is pressed
void Library::deleteKeyPressed(int lastRowSelected)
{
    DBG("DELETE CLICKED! ROW INDEX - " + juce::String{lastRowSelected});
};

// To allow rows from your table to be dragged - and -dropped, implement this method
juce::var Library::getDragSourceDescription(const juce::SparseSet< int >& currentlySelectedRows)
{
    // Pass URL attribute (File path)
    return libEntries->
                getChildElement(currentlySelectedRows[0])->
                    getStringAttribute("URL");
};

//===================================================================