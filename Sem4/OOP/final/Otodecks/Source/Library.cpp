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
Library::Library(FileBrowser* _fileBrowser, 
                    juce::AudioFormatManager& _formatManager) : fileBrowser(_fileBrowser),
                                                                formatManager(_formatManager)
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
    addAndMakeVisible(&libTable);

    // Change table model to our component
    libTable.setModel(this);

    // Set columns (we dont need to show last URL column, so shorten col number by 1)
    for (int i = 0; i < libStructure->getNumChildElements() - 1; ++i)
    {
        // Get column name
        juce::String colName = libStructure->getChildElement(i)->getStringAttribute("name");

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
    addAndMakeVisible(&loadLibBtn);
    addAndMakeVisible(&saveLibBtn);
    addAndMakeVisible(&addTrackBtn);
    addAndMakeVisible(&delTrackBtn);
    addAndMakeVisible(&searchField);

    addAndMakeVisible(&clearSearchBtn);
    addAndMakeVisible(&searchLabel);


    // Add linsteners
    loadLibBtn.onClick = [this] {loadLibClick(); };
    saveLibBtn.onClick = [this] {saveLibClick(); };
    addTrackBtn.onClick = [this] {addTrackClick(); };
    delTrackBtn.onClick = [this] {delTrackClick(); };
    searchField.onTextChange = [this] {searchChange(); };
    clearSearchBtn.onClick = [this] {clearSearch(); };

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
    searchField.setBounds(getWidth() * 0.7, 0, getWidth() * 0.25, getHeight() * 0.15);
    searchLabel.setBounds(getWidth() * 0.62, 0, getWidth() * 0.08, getHeight() * 0.15);
    clearSearchBtn.setBounds(getWidth() * 0.95, 0, getWidth() * 0.05, getHeight() * 0.15);
    
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

// Callback to check whether this target is interested in the set of files being offered
bool Library::isInterestedInFileDrag(const juce::StringArray& files) 
{
    return true;
};

// Callback to indicate that the user has dropped the files onto this component
void Library::filesDropped(const juce::StringArray& files, int x, int y) 
{
    // Iterate over every file dropped
    for(const auto file: files)
    {
        // Try to add it to the library
        addTrackToLib(juce::File{ file });
    }
};

//===================================================================

void Library::loadLibFile(juce::File& libFile)
{
    // Try to read selected file into an XML element pointer
    std::unique_ptr<juce::XmlElement> res = juce::parseXML(libFile);

    // Prepare flag variable to update library (erase "ghost" entries)
    bool shouldResave = false;

    // If XML parsed successfully
    if (res != nullptr)
    {
        // Create new XML file based on the saved lib
        juce::XmlElement verifiedRes{ *res };

        // Get shortcut to entries
        juce::XmlElement* verEntries = verifiedRes.getChildByName("ENTRIES");

        // Iterate over every loaded entry
        for (auto entry : verEntries->getChildIterator())
        {
            // Try to create file based on the URL
            juce::File f{ entry->getStringAttribute("URL")};

            // If there is no file with passed URL
            if (!f.existsAsFile())
            {
                // Remove "ghost" entry
                verEntries->removeChildElement(entry, false);

                // If flag is not switched yet > set flag ON
                if (!shouldResave)shouldResave = true;
            }
        }

        // Clear result pointer to prevent memory leaks
        res.reset();

        // Load verified library
        curLibrary = verifiedRes;

        // Reset shortcut pointers
        libStructure = curLibrary.getChildByName("STRUCTURE");
        libEntries = curLibrary.getChildByName("ENTRIES");

        // In case some tracks failed to load, reset ID order
        orderLibID();

        // If we need to "Re-save" library > do it
        if (shouldResave)
            saveLibFile(libFile);

        // Update visible entries list
        updateVisible();

        // Update library table
        libTable.updateContent();
    }
};

// Save file
void Library::saveLibFile(juce::File& libFile)
{
    // Save copy of the library to the file
    curLibrary.writeTo(libFile);
};



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
        juce::String colName = libStructure->getChildElement(i)->getStringAttribute("name");

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

// Find lib entry ID based on the visble entry ID
const int Library::getAbsID(const int visibleID) const
{
    // Get shortcut to the entry
    const juce::XmlElement* visEntry = visibleEntries[visibleID];

    // Check that argument is valid
    if (visibleID >= 0 && visibleID < visEntry->getNumAttributes())
    {
        // return atribute value
        return visEntry->getIntAttribute("ID", -1);
    }

    // If argument is out of range
    return -1;
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
juce::StringPairArray Library::getMetadata(juce::File file)
{
    // Prepare result variable
    juce::StringPairArray metaArr;

    // Attempt to create a reader for the file
    auto* reader = formatManager.createReaderFor(file);

    // If selected file has supported format and reader succesfully created
    if (reader != nullptr)
    {
        juce::AudioTransportSource trSrc{};

        // Create new ReaderSource object from the reader and prepare pointer
        std::unique_ptr<juce::AudioFormatReaderSource> newSource =
            std::make_unique<juce::AudioFormatReaderSource>(reader, true);

        // Pass newSource to the transport source
        trSrc.setSource(newSource.get(), 0, nullptr, reader->sampleRate);

        // Length in seconds (we transform from double to int)
        int lenSec = (int) trSrc.getLengthInSeconds();

        // Formated length as string
        juce::String length = std::to_string((int)(lenSec / 60)) + ":" + 
                              std::to_string((int)(fmod(lenSec, 60.0)));

        // Add length data to the result
        metaArr.set("Length", length);

        // Iterate over metadata container
        for (juce::String key : reader->metadataValues.getAllKeys())
        {
            // Add pair to the result array
            metaArr.set(key,
                reader->metadataValues.getValue(key, "none"));
        }

        // Clear ReaderSource pointer to prevent memory leaks
        newSource.release();
        newSource.reset();
    }

    return metaArr;
};


// Get selected track
const juce::XmlElement* Library::getSelected() const
{
    // Check currently selected row
    const int id = libTable.getSelectedRow();

    // If selected row exists
    if (id >= 0 && id < visibleEntries.size())
    {
        return visibleEntries[id];
    }
    
    // If not return nullptr
    return nullptr;
}


// Get track from the selected row
const juce::File Library::getSelectedTrack() const
{
    // Selected entry pointer
    const juce::XmlElement* selected = getSelected();

    // If entry exists
    if (selected)
    {
        // Get URL value of the selected track
        const juce::String URL = getSelected()->getStringAttribute("URL");

        // Create file from the URL
        const juce::File track = juce::File{ URL };

        // Check that file with this URL exists
        if (track.existsAsFile()) 
        {
            // Return this file
            return track;
        }
    }

    // Return empty file
    return juce::File{};
};


// Get track name from the selected row
const juce::String Library::getSelectedName() const
{
    // Selected entry pointer
    const juce::XmlElement* selected = getSelected();

    // If entry exists
    if (selected)
    {
        return selected->getStringAttribute("Track");
    }
   
    // If no entry found
    return getSelectedTrack().getFileName();
}


// Get track name from the selected row
const double Library::getSelectedBPM() const
{
    // Selected entry pointer
    const juce::XmlElement* selected = getSelected();

    // If entry exists
    if (selected)
    {
        // Get BPM from the selected track
        const double selectedBPM = selected->getStringAttribute("BPM").getDoubleValue();

        // If selected track has correct BPM value
        if ( selectedBPM > 0.0)
        {
            // Return new result value
            return selectedBPM;
        }
    }

    // Return "default" value
    return 0.0;
}

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
            // Load library file based on the selection
            loadLibFile(chooser.getResult());
        });

};

// Callback function to save library
void Library::saveLibClick()
{
    DBG("Save lib button");

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
                                    // Check that user selected file
                                    if (chooser.getResult().getSize() > 0)
                                    {
                                        // Save library file
                                        saveLibFile(chooser.getResult());
                                    }
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
            // Check that user selected something
            if (chooser.getResults().size() > 0)
            {
                // Iterate over all files
                for (auto entry : chooser.getResults())
                {
                    // Try to make entry based on the file
                    addTrackToLib(entry);
                }
            }
        });
};

// Callback function to delete selected track from the library
void Library::delTrackClick()
{
    DBG("Del lib button");

    // If some row is selected
    if (libTable.getSelectedRow() != -1)
    {
        // Get absolute ID
        const int absId = getAbsID(libTable.getSelectedRow()) - 1;

        // Delete row based on the absId
        deleteLibEntry(absId);
    }
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
 
// Clear search bar
void Library::clearSearch()
{
    DBG("Clear search field click!");

    // Clear search field
    searchField.setText("");

    // Fire search bar callback to update visuals
    searchChange();
};

// Add file from the file tree to the library
void Library::addTrackToLib(const juce::File& file)
{
    // If file has invalid format
    if (file.getFileExtension() != ".mp3" &&
        file.getFileExtension() != ".wav" &&
        file.getFileExtension() != ".aiff" &&
        file.getFileExtension() != ".aif")
    {
        // Print message and stop execution
        DBG("Library::addTrackToLib - ERROR! UNSUPPORTED FILE FORMAT {"+file.getFileExtension()+"}!");
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
        // Get metadata
        juce::StringPairArray metadata = getMetadata(file);

        // Prepare params
        juce::StringArray params{ juce::String{ curLibrary
                                                .getChildByName("ENTRIES")
                                                ->getNumChildElements() + 1 },  // next id number
                                                metadata.getValue("Title",      // title from metadata OR filename
                                                                            file.getFileNameWithoutExtension()),
                                                metadata.getValue("Artist", "noData"),  // artist from metadata
                                                metadata.getValue("Album", "noData"),   // album from metadata
                                                metadata.getValue("Genre", "noData"),   // genre from metadata
                                                metadata.getValue("Length", "noData"),  // length from metadata
                                                "noData",                               // no initial BPM data :(
                                                metadata.getValue("Key", "noData"),     // key from metadata
                                                file.getFullPathName()};                // file URL

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
    DBG("CELL CLICKED!");
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

    // If some row is selected
    if (libTable.getSelectedRow() != -1)
    {
        // Get absolute ID
        const int absId = getAbsID(libTable.getSelectedRow()) - 1;

        // Delete row based on the absId
        deleteLibEntry(absId);
    }
};

// To allow rows from your table to be dragged - and -dropped, implement this method
juce::var Library::getDragSourceDescription(const juce::SparseSet< int >& currentlySelectedRows)
{
    DBG("GET DRAG SOURCE DESCRIPTION");

    // Prepare result variable
    juce::StringArray res{};

    // Shortcut to the dragged entry
    juce::XmlElement* entry = libEntries->getChildElement(currentlySelectedRows[0]);

    // Add track URL to the result
    res.add(entry->getStringAttribute("URL"));

    // Add track name
    res.add(entry->getStringAttribute("Track"));

    // BPM stored OR "default" value
    const juce::String BPM = entry->getStringAttribute("BPM").getDoubleValue() > 0 ?
                                                  entry->getStringAttribute("BPM") :
                                                  "0.0";

    // Add track bpm
    res.add(BPM);

    return res;
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


// Override this to be informed when rows are selected or deselected
void Library::selectedRowsChanged(int lastRowSelected)
{
    DBG("SELECTION CHANGED!");
};

//===================================================================