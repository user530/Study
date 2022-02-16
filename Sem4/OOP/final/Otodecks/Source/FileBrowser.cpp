/*
  ==============================================================================

    FileBrowser.cpp
    Created: 4 Feb 2022 11:59:45am
    Author:  eosdu

  ==============================================================================
*/

#include <JuceHeader.h>
#include "FileBrowser.h"

//==============================================================================
FileBrowser::FileBrowser()
{
    // In your constructor, you should add any child components, and
    // initialise any special settings that your component needs.

    // Show file tree
    addAndMakeVisible(&fileTree);

    // Setup file browser to show documents directory
    contentList.setDirectory(
        juce::File::getSpecialLocation(juce::File::userHomeDirectory),
        true, true);

    // File tree
    fileTree.setTitle("Files");
    //fileTree.setColour(juce::FileTreeComponent::backgroundColourId,juce::Colours::lightgrey);

    // Add listener
    fileTree.addListener(this);

    // Start thread
    browserThread.startThread(3);
}

FileBrowser::~FileBrowser()
{
}

void FileBrowser::paint (juce::Graphics& g)
{
    /* This demo code just fills the component's background and
       draws some placeholder text to get you started.

       You should replace everything in this method with your own
       drawing code..
    */

    g.fillAll (getLookAndFeel().findColour (juce::ResizableWindow::backgroundColourId));   // clear the background

    g.setColour (juce::Colours::grey);
    g.drawRect (getLocalBounds(), 1);   // draw an outline around the component

}

void FileBrowser::resized()
{
    // This method is where you should set the bounds of any child
    // components that your component contains..
    fileTree.setBounds(0, 0, getWidth(), getHeight());
}

// Callback when the user selects a different file in the browser
void FileBrowser::selectionChanged() {};

// Callback when the user clicks on a file in the browser
void FileBrowser::fileClicked(const juce::File& file, const juce::MouseEvent& e){};

// Callback when the user double-clicks on a file in the browser
void FileBrowser::fileDoubleClicked(const juce::File& file)
{
    // If file has correct format
    if (file.getFileExtension() == ".mp3" ||
        file.getFileExtension() == ".wav;" ||
        file.getFileExtension() == ".aif")
    {
        DBG("CORRECT FORMAT!");
        // Store selected file
        selectedFile = juce::URL{ file };
    }
};

// Callback when the browser's root folder changes
void FileBrowser::browserRootChanged(const juce::File& newRoot){};