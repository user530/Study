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
    
    // Make table visible
    addAndMakeVisible(libTable);
    // Change table model to our component
    libTable.setModel(this);

    // Set columns
    libTable.getHeader().addColumn("ID", 1, 50);
    libTable.getHeader().addColumn("Track", 2, 50);
    libTable.getHeader().addColumn("Artist", 3, 50);
    libTable.getHeader().addColumn("Album", 4, 50);
    libTable.getHeader().addColumn("Genre", 5, 50);
    libTable.getHeader().addColumn("Length", 6, 50);
    libTable.getHeader().addColumn("BPM", 7, 50);
    libTable.getHeader().addColumn("Key", 8, 50);

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
    libTable.setBounds(0, getHeight() * 0.1, getWidth(), getHeight() * 0.9);

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
};

// Callback when the browser's root folder changes
void Library::browserRootChanged(const juce::File& newRoot) {};

//===================================================================



// Create XML library template 
juce::XmlElement Library::newLibXML(juce::String libName)
{
    // Create new XML lib element
    juce::XmlElement newLib{ libName };

    // Store initial structure to the XML element for future use
    newLib.addChildElement(new juce::XmlElement{ "STRUCTURE" });
    newLib.addChildElement(new juce::XmlElement{ "ENTRIES" });


    // Prepare all column names
    juce::StringArray columns{ "ID", "Track", "Artist", "Album", "Genre", "Length", "BPM", "Key", "URL"};
    
    // Get easy access to the structure child element
    juce::XmlElement* structure = newLib.getFirstChildElement();

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

    // Return library
    return newLib;
};

// Make XML entry to the current library         Make function to take number of params to store, not file
void Library::makeLibEntry(const juce::StringArray params)
{
    // Create new entry element
    juce::XmlElement* newEntry = new juce::XmlElement{ "ENTRY" };

    // Get easy access to the structure child element
    juce::XmlElement* structure = curLibrary->getFirstChildElement();

    DBG("THERE IS " + std::to_string(structure->getNumChildElements()) + " ELEMENTS IN THE STRUCTURE");

    // Iterate over all columns and 
    for (auto col : structure->getChildIterator())
    {
        newEntry->setAttribute(col->getAttributeValue(1),  // column name
                                "");    // file name !!! PLACEHOLDER
    }

    // Add new entry
    curLibrary->getChildByName("ENTRIES")->addChildElement(newEntry);
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
        DBG("ERROR! UNSUPPORTED FILE FORMAT!");
        return;
    }
    // If file format is correct
    else {

        // Check if lib file is opened 
        if (curLibrary != nullptr)
        {
            DBG("ADD ENTRY TO THE EXISTING FILE");
        }
        else
        {
            // Create new lib file
            auto newFile = juce::File::getCurrentWorkingDirectory().getChildFile("Lib.oto");
            newFile.create();

            // Create new library xml document
            juce::XmlElement newLib = newLibXML();

            // Set the new library as the current one
            curLibrary = std::unique_ptr<juce::XmlElement>{ &newLib };

            // Check that correct file is passed
            if (file != juce::File{})
            {
                // Make entry based on the passed data
                makeLibEntry(juce::StringArray{"TOP", "KEK"});

            }

            // SAVE CHANGES                                                        // DELETE
            newLib.writeTo(newFile);
        }

    }

};



//===================================================================

// This must return the number of rows currently in the table
int Library::getNumRows()
{
    return 8;
};

// This must draw the background behind one of the rows in the table
void Library::paintRowBackground(juce::Graphics& g,
    int rowNumber,
    int width,
    int height,
    bool rowIsSelected)
{

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

    
};

//===================================================================