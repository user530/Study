/*
  ==============================================================================

    PlaylistComponent.h
    Created: 27 Jan 2022 6:31:32pm
    Author:  eosdu

  ==============================================================================
*/

#pragma once

#include <JuceHeader.h>
#include <vector>
#include <string>

//==============================================================================
/*
*/
class PlaylistComponent  : public juce::Component,
                           public juce::TableListBoxModel,
                           public juce::Button::Listener
{
public:
    PlaylistComponent();
    ~PlaylistComponent() override;

    void paint (juce::Graphics&) override;
    void resized() override;

    // Playlist table list box model
    int getNumRows() override;
    void paintRowBackground(juce::Graphics&, int rowNumber, int width,
                            int height, bool rowIsSelected) override;
    void paintCell(juce::Graphics&, int rowNumber, int columnId, 
                   int width, int height, bool rowIsSelected) override;

    // Allow components into cells
    juce::Component* refreshComponentForCell(int rowNumber, int columnId,
        bool isRowSelected, juce::Component* existingComponentToUpdate) override;

    // Button listener
    void buttonClicked(juce::Button*) override;

private:

    // Playlist table
    juce::TableListBox tableComponent;

    std::vector<std::string> trackTitles;

    JUCE_DECLARE_NON_COPYABLE_WITH_LEAK_DETECTOR (PlaylistComponent)
};
