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

    // Make visible entries list
    updateVisible();


    // Make table visible
    addAndMakeVisible(libTable);
    // Change table model to our component
    libTable.setModel(this);

    // Set columns (we dont need to show last URL column, so shorten col number by 1)
    for (int i = 0; i < libStructure->getNumChildElements() - 1; ++i)
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

    // Add lib interface
    addAndMakeVisible(loadLibBtn);
    addAndMakeVisible(saveLibBtn);
    addAndMakeVisible(addTrackBtn);
    addAndMakeVisible(delTrackBtn);
    addAndMakeVisible(searchField);

    // Add linsteners
    loadLibBtn.onClick = [this] {loadLibClick(); };
    saveLibBtn.onClick = [this] {saveLibClick(); };
    addTrackBtn.onClick = [this] {addTrackClick(); };
    delTrackBtn.onClick = [this] {delTrackClick(); };
    searchField.onTextChange = [this] {searchChange(); };
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

    g.fillAll (getLookAndFeel()
                .findColour (juce::ResizableWindow::backgroundColourId));   // clear the background

    g.setColour (juce::Colours::grey);
    g.drawRect (getLocalBounds(), 1);   // draw an outline around the component

    g.setColour (juce::Colours::white);
    g.setFont (14.0f);
    g.drawText ("Library", 
                getLocalBounds(),
                juce::Justification::centred, true);   // draw some placeholder text

}

void Library::resized()
{
    // This method is where you should set the bounds of any child
    // components that your component contains..
    
    // Library table position
    libTable.setBounds(0, getHeight() * 0.15, getWidth(), getHeight() * 0.85);
    
    // Library control elements
    loadLibBtn.setBounds(0, 0, getWidth() * 0.135, getHeight() * 0.15);
    saveLibBtn.setBounds(getWidth() * 0.155, 0, getWidth() * 0.135, getHeight() * 0.15);
    addTrackBtn.setBounds(getWidth() * 0.31, 0, getWidth() * 0.135, getHeight() * 0.15);
    delTrackBtn.setBounds(getWidth() * 0.465, 0, getWidth() * 0.135, getHeight() * 0.15);
    searchField.setBounds(getWidth() * 0.62, 0, getWidth() * 0.38, getHeight() * 0.15);
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

// Helper functin to get current value from the selected cell
juce::String Library::getText(const int columnNumber, const int rowNumber) const
{
    // Get requested value
    return visibleEntries[rowNumber]->getAttributeValue(columnNumber-1);
};

// Helper functin to set new value to the selected cell
void Library::setText(const int columnNumber, const int rowNumber, const juce::String& newText)
{
    // Set new text to the cell
    libEntries->
        getChildElement(rowNumber)->
            setAttribute(getColName(columnNumber), newText);

    // Sort rows
    sortOrderChanged(columnNumber, true);

    // Update visible entries list
    updateVisible();

    // Update library table
    libTable.updateContent();
};

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

    // If argument array is the different size
    if (libStructure->getNumChildElements() != params.size())
    {
        // Print error and stop execution
        DBG("Library::makeLibEntry - Error! Number of parameters doesn't match the data structure!");
        return;
    }

    // Iterate over all columns
    for (int i = 0; i < libStructure->getNumChildElements(); ++i)
    {
        // Column name
        juce::String colName = libStructure->getChildElement(i)->getAttributeValue(1);

        // Set passed value as column value
        newEntry->setAttribute(colName,params[i]);
    }

    // Add new entry to the current library
    libEntries->addChildElement(newEntry);

    // Update visible entries list
    updateVisible();

    // Update library table
    libTable.updateContent();
};

// Update XML entry from the current library
void Library::updateLibEntry(const int columnNumber, const int rowNumber, const juce::String& newText)
{
    // Update attribute 
    libEntries->getChildElement(rowNumber)->setAttribute(newText, getColName(columnNumber));

    // Update library table
    libTable.updateContent();
};

// Delete XML entry from the current library
void Library::deleteLibEntry(const int rowNumber)
{
    // Get requested entry
    juce::XmlElement* entryToDel= libEntries->getChildElement(rowNumber);

    // Remove requested entry
    libEntries->removeChildElement(entryToDel, true);

    // Update ID for every entry
    orderLibID();

    // Update visible entries list
    updateVisible();

    // Update library table
    libTable.updateContent();
};

// Update library ID order
void Library::orderLibID() const
{
    // Iterate over every entry and set new ID
    for (int i = 0; i < libEntries->getNumChildElements(); ++i)
    {
        // Set ID value based on the position
        libEntries->getChildElement(i)->setAttribute("ID", i+1);
    }
};

// Helper function to get attribute name based on the passed column number
juce::String Library::getColName(const int columnNumber) const
{
    return libTable.getHeader().getColumnName(columnNumber);
};

// Filter current library based on the argument passed
void Library::updateVisible()
{
    // Get search field value
    juce::String fString = searchField.getText().trim();

    // Clean visible entries
    visibleEntries.clear();

    // Iterate over every element
    for (auto element : libEntries->getChildIterator())
    {
        // Calculate number of attributes (except URL)
        const int length = element->getNumAttributes() - 1;

        // Iterate over every attribute
        for (int i = 0; i < length; ++i)
        {
            // Checking if attribute contains filtered substring (case insensitive) OR empty string is passed
            bool check = element->getAttributeValue(i).toLowerCase()
                        .contains(fString.toLowerCase())    ||
                                                                fString == "";

            // If attribute contains filter string OR empty string is passed
            if (check)
            {
                // Add this element to the visible list and move to the next one
                visibleEntries.add(element);
                break;
            }
        }
    }
};

// Get metadata
juce::String Library::getMetadata()
{


};

// Callback function to load library
void Library::loadLibClick()
{
    DBG("Load lib button");

    // Create new FileChooser and get the file name
    fileChooserPtr.reset(new juce::FileChooser("Choose a library to open",
                            juce::File::getCurrentWorkingDirectory(),
                            "*.oto")
                        );

    // Create file open closure
    fileChooserPtr->launchAsync(juce::FileBrowserComponent::openMode |
                                juce::FileBrowserComponent::canSelectFiles,
        [this](const juce::FileChooser& chooser)
        {
            // Try to read selected file into an XML element pointer
            std::unique_ptr<juce::XmlElement> res = juce::parseXML(chooser.getResult());

            // If XML parsed successfully
            if (res != nullptr)
            {
                // Fill current library with library data
                curLibrary = *res.release();

                // Reset shortcut pointers
                libStructure = curLibrary.getChildByName("STRUCTURE");
                libEntries = curLibrary.getChildByName("ENTRIES");

                // Update visible entries list
                updateVisible();

                // Update library table
                libTable.updateContent();
            }
        });

};

// Callback function to save library
void Library::saveLibClick()
{
    DBG("Save lib button");

    // Store library copy to the variable for the future use                    //DELETE
    //juce::XmlElement lib{ curLibrary };

    // Create new FileChooser and get the file name
    fileChooserPtr.reset(new juce::FileChooser("Choose a library name",
                                                juce::File::getCurrentWorkingDirectory()
                                                            .getChildFile("newLib"),
                                                "*.oto")
                        );

    // Create file saving closure
    fileChooserPtr->launchAsync(juce::FileBrowserComponent::saveMode |
                                juce::FileBrowserComponent::canSelectFiles,
                                [this](const juce::FileChooser& chooser)
                                {
                                    // File selected in file chooser
                                    juce::File res = chooser.getResult();

                                    // Save copy of the library to file
                                    curLibrary.writeTo(chooser.getResult());
                                    //lib.writeTo(chooser.getResult());             //DELETE
                                }); 
};

// Callback function to add track/s to the library
void Library::addTrackClick()
{
    DBG("Add track button");

    // Create new FileChooser and get file names
    fileChooserPtr.reset(new juce::FileChooser("Choose file(-s) to add...",
                                juce::File::getSpecialLocation(juce::File::userMusicDirectory),
                                "*.mp3;*.wav;*.aif")
    );

    // Create file open closure (multiple)
    fileChooserPtr->launchAsync(juce::FileBrowserComponent::openMode |
        juce::FileBrowserComponent::canSelectFiles |
        juce::FileBrowserComponent::canSelectMultipleItems,
        [this](const juce::FileChooser& chooser)
        {
            // Iterate over all files
            for (auto entry : chooser.getResults())
            {
                // Try to make entry based on the file
                addTrackToLib(entry);
            }
        });
};

// Callback function to delete selected track from the library
void Library::delTrackClick()
{
    DBG("Del lib button");

    // Delete selected row
    deleteLibEntry(libTable.getSelectedRows()[0]);
};

// Callback function for the load button
void Library::searchChange()
{
    DBG("Search field changed!");

    // Update list of visible entries
    updateVisible();

    // Update table data
    libTable.updateContent();
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
     
    }
};

//===================================================================

// This must return the number of rows currently in the table
int Library::getNumRows()
{
    return visibleEntries.size();
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
        // make different colours for different rows
        if (rowNumber % 2 == 0)
        {
            g.fillAll(getLookAndFeel().findColour(juce::ResizableWindow::backgroundColourId));
        }
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

    // Draw visible cells
    if (juce::XmlElement* entryP = visibleEntries[rowNumber])
    {
        // Get data from the cell based on the col id
        juce::String cellData = entryP->getAttributeValue(columnId - 1);

        // Draw cell data
        g.drawText(cellData, 2, 0, width - 4, height, juce::Justification::centredRight);
    }
    
    

};

// This callback is made when the user clicks on one of the cells in the table
void Library::cellClicked(int rowNumber, int columnId, const juce::MouseEvent&)
{
    
};

// This callback is made when the table's sort order is changed        
void Library::sortOrderChanged(int newSortColumnId, bool isForwards) 
{
    if(libEntries->getNumChildElements() != 0)
    {
        // Setup sorter based on the column name and search direction
        DemoDataSorter sorter(libEntries->
                                getFirstChildElement()->
                                    getAttributeName(newSortColumnId - 1), isForwards);

        // Sort entries
        libEntries->sortChildElements(sorter);

        // Update visible entries list
        updateVisible();

        // Update library table
        libTable.updateContent();
    }
};

// Override this to be informed when the delete key is pressed
void Library::deleteKeyPressed(int lastRowSelected)
{
    // Delete selected row
    deleteLibEntry(lastRowSelected);
};

// To allow rows from your table to be dragged - and -dropped, implement this method
juce::var Library::getDragSourceDescription(const juce::SparseSet< int >& currentlySelectedRows)
{
    DBG("GET DRAG SOURCE DESCRIPTION");

    // Pass URL attribute (File path)
    return libEntries->
                getChildElement(currentlySelectedRows[0])->
                    getStringAttribute("URL");
};

// This is used to create or update a custom component to go in a cell
//(from the WidgetsDemo from the base JUCE demo collection, adapted)
juce::Component* Library::refreshComponentForCell(int rowNumber,
                                                    int columnId,
                                                    bool isRowSelected,
                                                    Component* existingComponentToUpdate)
{
    // To prevent edits for the ID column, return nullptr
    if (columnId == 1)
        return nullptr;

    // The other columns are editable text columns, for which we use the custom Label component
    auto* textLabel = static_cast<EditableTextCustomComponent*> (existingComponentToUpdate);

    // same as above...
    if (textLabel == nullptr)
        textLabel = new EditableTextCustomComponent(*this);

    // Update content
    textLabel->setRowAndColumn(rowNumber, columnId);

    return textLabel;
};

//===================================================================