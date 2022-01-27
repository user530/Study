/*
  ==============================================================================

    PlaylistComponent.cpp
    Created: 27 Jan 2022 6:31:32pm
    Author:  eosdu

  ==============================================================================
*/

#include <JuceHeader.h>
#include "PlaylistComponent.h"

//==============================================================================
PlaylistComponent::PlaylistComponent()
{
    // In your constructor, you should add any child components, and
    // initialise any special settings that your component needs.


    // Add sone dummy data
    trackTitles.push_back("Track1");
    trackTitles.push_back("Track2");
    trackTitles.push_back("Track3");
    trackTitles.push_back("Track4");
    trackTitles.push_back("Track5");
    trackTitles.push_back("Track6");
    trackTitles.push_back("Track7");

    // Point table component to the playlist
    tableComponent.setModel(this);

    // Setup playlist header
    tableComponent.getHeader().addColumn("Track title", 1, 400);
    tableComponent.getHeader().addColumn("Play track", 2, 200);

    // Playlist table -> visible
    addAndMakeVisible(tableComponent);

}

PlaylistComponent::~PlaylistComponent()
{
}

void PlaylistComponent::paint (juce::Graphics& g)
{
    /* This demo code just fills the component's background and
       draws some placeholder text to get you started.

       You should replace everything in this method with your own
       drawing code..
    */

    g.fillAll (getLookAndFeel().findColour (juce::ResizableWindow::backgroundColourId));   // clear the background

    g.setColour (juce::Colours::orange);
    g.drawRect (getLocalBounds(), 1);   // draw an outline around the component

    g.setColour (juce::Colours::white);
    g.setFont (22.0f);
    g.drawText ("PlaylistComponent", getLocalBounds(),
                juce::Justification::centred, true);   // draw some placeholder text
}

void PlaylistComponent::resized()
{
    // This method is where you should set the bounds of any child
    // components that your component contains..

    // Playlist table
    tableComponent.setBounds(0, 0, getWidth(), getHeight());

}

int PlaylistComponent::getNumRows()
{
    // Return number of rows
    return trackTitles.size();
};

void PlaylistComponent::paintRowBackground(juce::Graphics& g, int rowNumber, int width,
    int height, bool rowIsSelected)
{
    if (rowIsSelected)
    {
        g.fillAll(juce::Colours::orange);
    }
    else {
        g.fillAll(juce::Colours::darkgrey);
    }
};

void PlaylistComponent::paintCell(juce::Graphics& g, int rowNumber, int columnId,
    int width, int height, bool rowIsSelected)
{
    // Draw dummy data from the vector
    g.drawText(trackTitles[rowNumber], 2, 0, 
               width - 4, height, juce::Justification::centredLeft, true);
};

// Allow to draw components in tableListBoxModel cells
juce::Component* PlaylistComponent::refreshComponentForCell(int rowNumber, 
                                                            int columnId,
                                                            bool isRowSelected, 
                                                            juce::Component* existingComponentToUpdate)
{
    // If we pass the second column
    if (columnId == 2)
    {
        // Component not created yet
        if (existingComponentToUpdate == nullptr)
        {
            existingComponentToUpdate = new juce::TextButton{ "Play!" };
        }
    }
    // Return component
    return existingComponentToUpdate;
};