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
PlayerGUI::PlayerGUI(Player* _player,
                     Waveform* _waveform) : player(_player),
                                             waveform(_waveform)
{
    // In your constructor, you should add any child components, and
    // initialise any special settings that your component needs.


    // Show GUI elements
    addAndMakeVisible(&playBtn);
    addAndMakeVisible(&stopBtn);
    addAndMakeVisible(&openBtn);

    // Control sliders
    addAndMakeVisible(&gainSld);
    addAndMakeVisible(&timeSld);
    addAndMakeVisible(&tempoSld);

    // Loop btn
    addAndMakeVisible(&loopBtn);
        
    // Add callbacks to the GUI elements
    playBtn.onClick = [this] { playBtnClick(); };
    stopBtn.onClick = [this] { stopBtnClick(); };
    openBtn.onClick = [this] { openBtnClick(); };
    loopBtn.onClick = [this] { loopBtnClick(); };

    gainSld.onValueChange = [this] { gainSldChange(); };
    timeSld.onValueChange = [this] { timeSldChange(); };
    tempoSld.onValueChange = [this] { tempoSldChange(); };

    // Disable control buttons when there is no track
    playBtn.setEnabled(false);
    stopBtn.setEnabled(false);

    // Add names to the buttons
    playBtn.setButtonText("Play");
    stopBtn.setButtonText("Stop");
    openBtn.setButtonText("Open file");

    // Setup gain slider
    gainSld.setRange(0.0, 3.0);
    gainSld.setValue(1.0);

    // Setup time slider
    timeSld.setRange(0.0, 1.0);
    timeSld.setValue(0.0);

    // Setup time slider
    tempoSld.setRange(0.1, 8.0);
    tempoSld.setValue(1);


    // Add listener to the transport source
    (player -> getTransportSource()) -> addChangeListener(this);
    // Add listener to the waveform
    (waveform -> getAudioThumb()) -> addChangeListener(this);

    // Start timer thread
    startTimer(40);

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
    playBtn.setBounds(0, 0, getWidth() / 4, getHeight() / 6);
    stopBtn.setBounds(0, getHeight() * 1/6, getWidth() / 4, getHeight() / 6);
    openBtn.setBounds(0, getHeight() * 2/6, getWidth() / 4, getHeight() / 6);
    gainSld.setBounds(0, getHeight() * 3/6, getWidth(), getHeight() / 6);
    timeSld.setBounds(0, getHeight() * 4/6, getWidth(), getHeight() / 6);
    tempoSld.setBounds(0, getHeight() * 5/6, getWidth(), getHeight() / 6);

    loopBtn.setBounds(getWidth() * 3 / 4, 0, getWidth() / 4, getHeight() / 6);

}


// Callback function that will be fired each time listener register change(s)
void PlayerGUI::changeListenerCallback(juce::ChangeBroadcaster* source)
{
    // If change fired by transport source
    if (source == player -> getTransportSource())
    {
        // Change player based on the state
        transpChange(player -> getTransportSource());
    }
    // If change fired by audio thumb
    else if(source == waveform -> getAudioThumb())
    {
        // Execute thumbnail change callback
        thumbChange(waveform -> getAudioThumb());
    }
};

// The user-defined callback routine that actually gets called periodically.
void PlayerGUI::timerCallback()
{
    // Update playhead position
    waveform->setRelPos(player -> getPosRel());
};


void PlayerGUI::playBtnClick() const
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
    //=======================================================================Multithreading problem!

    // Create file chooser
    chooser = std::make_unique<juce::FileChooser>("Select a file to play...", 
                                                    juce::File{}, 
                                                    "*.wav;*.mp3;*.aif");

    // Set options for FileBrowserComponent - that browser can open and select 
    auto chooserFlags = juce::FileBrowserComponent::openMode |
                        juce::FileBrowserComponent::canSelectFiles;

    // Run asynchronous file browser window
    chooser -> launchAsync(chooserFlags, [this](const juce::FileChooser& FC)
        {
            // File selected in the window
            juce::File file = FC.getResult();

            // Check that user selected actual file in the browser window
            if (file != juce::File{})
            {
                // If file opened successfully
                if (player -> openFile(juce::URL{ file }))
                {
                    // Enable play btn after file is loaded
                    playBtn.setEnabled(true);

                    // Restore loop setting
                    player -> setLooping(loopBtn.getToggleState());

                    // Pass the audio data to the AudioThumb object to draw the waveform 
                    (waveform -> getAudioThumb()) ->
                                                 setSource(new juce::FileInputSource(file));
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

void PlayerGUI::loopBtnClick() const
{
    // Set new loop state based on the btn value
    player->setLooping( loopBtn.getToggleState() );
};

void PlayerGUI::gainSldChange() const
{
    //Get the value of the slider and converse type
    float newGain = (float) gainSld.getValue();

    // Set new gain level of the player
    (player->getTransportSource())->setGain(newGain);
};

void PlayerGUI::timeSldChange() const
{
    //Get the value of the slider and converse type
    float newPos = (float)timeSld.getValue();

    // Set new timestamp
    player->setPosRel(newPos);
};

void PlayerGUI::tempoSldChange() const
{
    // Get the value of the slider
    double newTempo = tempoSld.getValue();

    // Set new tempo
    player->setTempo(newTempo);
};

// Logic behind changes of transport source
void PlayerGUI::transpChange(juce::AudioTransportSource* transpSrcP)
{   
    // Player state
    Player::PlayerState plState = player -> getState();

    // If audio is currently playing
    if (transpSrcP -> isPlaying())
    {
        // Set state accordingly
        player -> changeState(Player::PlayerState::Playing);

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
        player -> changeState(Player::PlayerState::Stopped);

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
        player -> changeState(Player::PlayerState::Paused);

        // Set btn txt to "Resume" and "Reset"
        playBtn.setButtonText("Resume");
        stopBtn.setButtonText("Reset");
    }
};

// Logic behind changes of thumbnail
void PlayerGUI::thumbChange(juce::AudioThumbnail* thumbP)
{
    // Update visuals
    waveform -> repaint();
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