/*
  ==============================================================================

    PlayerGUI.cpp
    Created: 4 Feb 2022 11:57:30am
    Author:  eosdu

  ==============================================================================
*/

#include <JuceHeader.h>
#include "PlayerGUI.h"

//==============================================================================
PlayerGUI::PlayerGUI(Player* _player) : player(_player)
{
    // In your constructor, you should add any child components, and
    // initialise any special settings that your component needs.


    // Show GUI elements
    addAndMakeVisible(&playBtn);
    addAndMakeVisible(&stopBtn);
    addAndMakeVisible(&openBtn);
    
    // Add callbacks to the GUI elements
    playBtn.onClick = [this] { playBtnClick(); };
    stopBtn.onClick = [this] { stopBtnClick(); };
    openBtn.onClick = [this] { openBtnClick(); };

    // Disable control buttons when there is no track
    playBtn.setEnabled(false);
    stopBtn.setEnabled(false);

    // Add names to the buttons
    playBtn.setButtonText("Play");
    stopBtn.setButtonText("Stop");
    openBtn.setButtonText("Open file");

    // Add listener to the transport source
    ( player->getTransportSource() )->addChangeListener(this);
} 

PlayerGUI::~PlayerGUI()
{
}

void PlayerGUI::paint (juce::Graphics& g)
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
    g.drawText ("PlayerGUI", getLocalBounds(),
                juce::Justification::centred, true);   // draw some placeholder text
}

void PlayerGUI::resized()
{
    // This method is where you should set the bounds of any child
    // components that your component contains..
    playBtn.setBounds(getWidth() / 4, 0, getWidth() / 2, getHeight() / 6);
    stopBtn.setBounds(getWidth() / 4, getHeight() * 1/6, getWidth() / 2, getHeight() / 6);
    openBtn.setBounds(getWidth() / 4, getHeight() * 2/6, getWidth() / 2, getHeight() / 6);
}


// Callback function that will be fired each time listener register change(s)
void PlayerGUI::changeListenerCallback(juce::ChangeBroadcaster* source)
{
    // Pointer to the player transport source
    auto* transpSourceP = player->getTransportSource();

    // Player state
    Player::PlayerState plState = player->getState();

    // If check is fired by the change of the transport source
     if (source == transpSourceP)
    {
        // If audio is currently playing
        if (transpSourceP->isPlaying())
        {
            // Set state accordingly
            player->changeState(Player::PlayerState::Playing);

            // Set btn text to "Pause" and "Stop"
            playBtn.setButtonText("Pause");
            stopBtn.setButtonText("Stop");

            // Enable stop btn
            stopBtn.setEnabled(true);
        }
        // If player winding down
        else if ((plState == Player::PlayerState::Stopping) || 
                    (plState == Player::PlayerState::Playing))
        {
            // Stop the player
            player->changeState(Player::PlayerState::Stopped);

            // Set btn text to "Play" and "Stop"
            playBtn.setButtonText("Play");
            stopBtn.setButtonText("Stop");

            // Disable stop btn
            stopBtn.setEnabled(false);

        }
        // If user player pausing
        else if (plState == Player::PlayerState::Pausing) 
        {
            // Pause the player
            player->changeState(Player::PlayerState::Paused);

            // Set btn txt to "Resume" and "Reset"
            playBtn.setButtonText("Resume");
            stopBtn.setButtonText("Reset");
        }
    }
};

void PlayerGUI::playBtnClick() 
{
    // Get player state
    auto playerState = player->getState();

    // When player is not playing
    if (playerState == Player::PlayerState::Stopped ||
        playerState == Player::PlayerState::Paused)
    {
        // Start playing 
        player->changeState(Player::PlayerState::Starting);

    }
    // If player is playing already
    else if (playerState == Player::PlayerState::Playing)
    {
        // Pause instead
        player->changeState(Player::PlayerState::Pausing);

    }
};

void PlayerGUI::stopBtnClick() 
{
    // If player is already paused
    if (player->getState() == Player::PlayerState::Paused)
    {
        // Stop completely
        player->changeState(Player::PlayerState::Stopped);

        // Set btn text to "Play" and "Stop"
        playBtn.setButtonText("Play");
        stopBtn.setButtonText("Stop");

        // Disable stop btn
        stopBtn.setEnabled(false);
    }
    // If else
    else 
    {
        // Pause
        player->changeState(Player::PlayerState::Stopping);
    }
};

void PlayerGUI::openBtnClick() 
{
    // Create file chooser
    chooser = std::make_unique<juce::FileChooser>("Select a file to play...", 
                                                    juce::File{}, 
                                                    "*.wav;*.mp3;*.aif");

    // Set options for FileBrowserComponent - that browser can open and select 
    auto chooserFlags = juce::FileBrowserComponent::openMode |
                        juce::FileBrowserComponent::canSelectFiles;

    // Run asynchronous file browser window
    chooser->launchAsync(chooserFlags, [this](const juce::FileChooser& FC)
        {
            // File selected in the window
            juce::File file = FC.getResult();

            // Check that user selected actual file in the browser window
            if (file != juce::File{})
            {
                // Open file in the player
                //player->openFile(juce::URL{ file });

                // If file opened successfully
                if (player->openFile(juce::URL{ file }))
                {
                    // Enable play btn after file is loaded
                    playBtn.setEnabled(true);
                }
                // If not
                else
                {
                    // Alert user
                    DBG("PLAYER::OPEN FILE - ERROR! CAN'T OPEN THE TRACK!");
                }
            }
        });

};


bool PlayerGUI::isInterestedInFileDrag(const juce::StringArray& files)
{
    return true;
};

void PlayerGUI::filesDropped(const juce::StringArray& files, int x, int y)
{
    // Check that only one file dropped
    if (files.size() == 1)
    {
        // Load URL from the dropped file
        player->openFile(juce::URL{ juce::File{files[0]} });
    }
};