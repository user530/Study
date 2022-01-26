/*
  ==============================================================================

	DeckGUI.cpp
	Created: 26 Jan 2022 11:26:20am
	Author:  eosdu

  ==============================================================================
*/

#include <JuceHeader.h>
#include "DeckGUI.h"

//==============================================================================
DeckGUI::DeckGUI(DJAudioPlayer* _player) :player(_player)
{
	// In your constructor, you should add any child components, and
	// initialise any special settings that your component needs.

	addAndMakeVisible(playButton);  // Play audio btn
	addAndMakeVisible(stopButton);  // Stop audio btn
	addAndMakeVisible(loadFile);    // Load file btn

	addAndMakeVisible(volSlider);   // Volume slider
	addAndMakeVisible(speedSlider); // Speed slider
	addAndMakeVisible(timeSlider);  // Timestamp slider


	volSlider.setRange(0.0, 2.0);   // Limit volume from 0% to 200%
	volSlider.setValue(1.0);        // Set initial volume to 100%

	speedSlider.setRange(0.1, 8.0); // Limit speed from 10% to 800%
	speedSlider.setValue(1.0);      // Set initial speed to 100%

	timeSlider.setRange(0.0, 1.0);  // Limit relative position from 0% to 100%
	timeSlider.setValue(0.0);       // Set initial relative position to 0%

	playButton.addListener(this);   // Add listener to play btn
	stopButton.addListener(this);   // Add listener to stop btn
	loadFile.addListener(this);     // Add listener to load file btn

	volSlider.addListener(this);    // Add listener to volume slider
	speedSlider.addListener(this);  // Add listener to speed slider
	timeSlider.addListener(this);   // Add listener to timstamp slider
}

DeckGUI::~DeckGUI()
{
}

void DeckGUI::paint(juce::Graphics& g)
{
	/* This demo code just fills the component's background and
	   draws some placeholder text to get you started.

	   You should replace everything in this method with your own
	   drawing code..
	*/

	g.fillAll(getLookAndFeel().findColour(juce::ResizableWindow::backgroundColourId));   // clear the background

	//g.setColour(juce::Colours::grey);
	//g.drawRect(getLocalBounds(), 1);   // draw an outline around the component

	//g.setColour(juce::Colours::white);
	//g.setFont(14.0f);
	//g.drawText("DeckGUI", getLocalBounds(),
	//	juce::Justification::centred, true);   // draw some placeholder text
}

void DeckGUI::resized()
{
	// This method is where you should set the bounds of any child
	// components that your component contains..

	double rowH = getHeight() / 6;

	playButton.setBounds(0, 0, getWidth(), rowH);           // Setup play btn
	stopButton.setBounds(0, rowH, getWidth(), rowH);        // Setup stop btn

	volSlider.setBounds(0, 2 * rowH, getWidth(), rowH);     // Setup volume slider
	speedSlider.setBounds(0, 3 * rowH, getWidth(), rowH);   // Setup speed slider
	timeSlider.setBounds(0, 4 * rowH, getWidth(), rowH);    // Setup timestamp slider

	loadFile.setBounds(0, 5 * rowH, getWidth(), rowH);      // Setup loadfile btn
}

void DeckGUI::buttonClicked(juce::Button* btnP) {
	if (btnP == &playButton) {
		// Activate player
		player->playing = true;

		// Start playing
		player->start();
	}
	else if (btnP == &stopButton) {
		// Disable player
		player->playing = false;

		// Stop playing
		player->stop();
	}
	else if (btnP == &loadFile) {
		// Create file chooser window
		juce::FileChooser chooser{ "Select a file..." };

		// If user selects file
		if (chooser.browseForFileToOpen()) {
			// Load audio file from the URL of the selected file
			player->loadURL(juce::URL{ chooser.getResult() });
		}
	}
};

void DeckGUI::sliderValueChanged(juce::Slider* sldP) {
	if (sldP == &volSlider) {
	    // Set volume 
	    player->setGain(sldP->getValue());
	}
	else if (sldP == &speedSlider) {
	    // Set speed
		player->setSpeed(sldP->getValue());
	}
	else if (sldP == &timeSlider) {
	    // Set timestamp
		player->setPositionRelative(sldP->getValue());
	}
};

bool DeckGUI::isInterestedInFileDrag(const juce::StringArray& files) 
{
	return true;
};

void DeckGUI::filesDropped(const juce::StringArray& files, int x, int y) 
{
	// Check that only one file dropped
	if (files.size() == 1)
	{
		// Load URL from the dropped file
		player->loadURL(juce::URL{ juce::File{files[0]} });
	}
};