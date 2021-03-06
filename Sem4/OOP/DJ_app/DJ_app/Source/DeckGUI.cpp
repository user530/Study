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
DeckGUI::DeckGUI(DJAudioPlayer* _player,
				 juce::AudioFormatManager& formatManagerToUse,
				 juce::AudioThumbnailCache& cacheToUse) : player(_player),
														  waveformDisplay(formatManagerToUse, cacheToUse)
{
	// In your constructor, you should add any child components, and
	// initialise any special settings that your component needs.

	addAndMakeVisible(playButton);		// Play audio btn
	addAndMakeVisible(stopButton);		// Stop audio btn
	addAndMakeVisible(loadFile);		// Load file btn

	addAndMakeVisible(volSlider);		// Volume slider
	addAndMakeVisible(speedSlider);		// Speed slider
	addAndMakeVisible(timeSlider);		// Timestamp slider

	addAndMakeVisible(waveformDisplay); // Waveform display


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

	// Start timer thread
	startTimer(100); // Interval to call in ms
}

DeckGUI::~DeckGUI()
{
	// End timer
	stopTimer();
}

void DeckGUI::paint(juce::Graphics& g)
{
	// Clear background
	g.fillAll(getLookAndFeel().findColour(juce::ResizableWindow::backgroundColourId)); 

}

void DeckGUI::resized()
{
	// This method is where you should set the bounds of any child
	// components that your component contains..

	double rowH = getHeight() / 8;

	playButton.setBounds(0, 0, getWidth(), rowH);					// Setup play btn
	stopButton.setBounds(0, rowH, getWidth(), rowH);				// Setup stop btn

	volSlider.setBounds(0, 2 * rowH, getWidth(), rowH);				// Setup volume slider
	speedSlider.setBounds(0, 3 * rowH, getWidth(), rowH);			// Setup speed slider
	timeSlider.setBounds(0, 4 * rowH, getWidth(), rowH);			// Setup timestamp slider

	waveformDisplay.setBounds(0, 5 * rowH, getWidth(), 2 * rowH);	// Setup waveform display

	loadFile.setBounds(0, 7 * rowH, getWidth(), rowH);				// Setup loadfile btn
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

			// Pass audio file from the URL to the waveform component
			waveformDisplay.loadURL(juce::URL{ chooser.getResult() });
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

void DeckGUI::timerCallback()
{
	// Get position from the player and pass it to the waveform display
	waveformDisplay.setPositionRelative(player->getPositionRelative());
};