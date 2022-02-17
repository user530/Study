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

    libTable.getHeader().addColumn("ID", 0, 50);
    libTable.getHeader().addColumn("Track", 1, 50);
    libTable.getHeader().addColumn("Artist", 2, 50);
    libTable.getHeader().addColumn("Album", 3, 50);
    libTable.getHeader().addColumn("Genre", 4, 50);
    libTable.getHeader().addColumn("Length", 5, 50);
    libTable.getHeader().addColumn("BPM", 6, 50);
    libTable.getHeader().addColumn("Key", 7, 50);

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

// Callback when the user selects a different file in the browser
void Library::selectionChanged() {};

// Callback when the user clicks on a file in the browser
void Library::fileClicked(const juce::File& file, const juce::MouseEvent& e) {};

// Callback when the user double-clicks on a file in the browser
void Library::fileDoubleClicked(const juce::File& file)
{
    // If file has correct format
    if (file.getFileExtension() == ".mp3" ||
        file.getFileExtension() == ".wav;" ||
        file.getFileExtension() == ".aif")
    {
        // Store selected file in the library
        library.add(juce::URL{ file });
    }
};

// Callback when the browser's root folder changes
void Library::browserRootChanged(const juce::File& newRoot) {};


// This must return the number of rows currently in the table
int Library::getNumRows()
{
    return 8;
};

// This must draw the background behind one of the rows in the table
void Library::paintRowBackground(juce::Graphics&,
    int rowNumber,
    int width,
    int height,
    bool rowIsSelected)
{

};

// This must draw one of the cells
void Library::paintCell(juce::Graphics&,
    int rowNumber,
    int columnId,
    int width,
    int height,
    bool rowIsSelected)
{

};