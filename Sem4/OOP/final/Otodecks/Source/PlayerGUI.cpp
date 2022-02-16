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
        

    // Que edit mode btn
    addAndMakeVisible(&queEditBtn);

    // Hot que btns
    addAndMakeVisible(&Que1Btn);
    addAndMakeVisible(&Que2Btn);
    addAndMakeVisible(&Que3Btn);
    addAndMakeVisible(&Que4Btn);
    addAndMakeVisible(&Que5Btn);
    addAndMakeVisible(&Que6Btn);
    addAndMakeVisible(&Que7Btn);
    addAndMakeVisible(&Que8Btn);

    // Add callbacks to the GUI elements
    playBtn.onClick = [this] { playBtnClick(); };
    stopBtn.onClick = [this] { stopBtnClick(); };
    openBtn.onClick = [this] { openBtnClick(); };
    loopBtn.onClick = [this] { loopBtnClick(); };

    gainSld.onValueChange = [this] { gainSldChange(); };
    timeSld.onValueChange = [this] { timeSldChange(); };
    tempoSld.onValueChange = [this] { tempoSldChange(); };

    queEditBtn.onClick = [this] { queEditClick(); };

    Que1Btn.onClick = [this] { hotQueClick(&Que1Btn); };
    Que2Btn.onClick = [this] { hotQueClick(&Que2Btn); };
    Que3Btn.onClick = [this] { hotQueClick(&Que3Btn); };
    Que4Btn.onClick = [this] { hotQueClick(&Que4Btn); };
    Que5Btn.onClick = [this] { hotQueClick(&Que5Btn); };
    Que6Btn.onClick = [this] { hotQueClick(&Que6Btn); };
    Que7Btn.onClick = [this] { hotQueClick(&Que7Btn); };
    Que8Btn.onClick = [this] { hotQueClick(&Que8Btn); };


    // Disable control buttons when there is no track
    playBtn.setEnabled(false);
    stopBtn.setEnabled(false);

    loopBtn.setEnabled(false);
    queEditBtn.setEnabled(false);
    Que1Btn.setEnabled(false);
    Que2Btn.setEnabled(false);
    Que3Btn.setEnabled(false);
    Que4Btn.setEnabled(false);
    Que5Btn.setEnabled(false);
    Que6Btn.setEnabled(false);
    Que7Btn.setEnabled(false);
    Que8Btn.setEnabled(false);

    // Add initial names to the buttons
    playBtn.setButtonText("Play");
    stopBtn.setButtonText("Stop");

    // Make state btns - toggleable
    loopBtn.setClickingTogglesState(true);
    queEditBtn.setClickingTogglesState(true);

    // Change colour when button activated
    loopBtn.setColour(juce::TextButton::buttonOnColourId, juce::Colours::red);
    queEditBtn.setColour(juce::TextButton::buttonOnColourId, juce::Colours::green);

    // Set colours of the hot que buttons
    Que1Btn.setColour(juce::TextButton::buttonOnColourId, juce::Colours::lightpink);
    Que2Btn.setColour(juce::TextButton::buttonOnColourId, juce::Colours::lightpink);
    Que3Btn.setColour(juce::TextButton::buttonOnColourId, juce::Colours::lightpink);
    Que4Btn.setColour(juce::TextButton::buttonOnColourId, juce::Colours::lightpink);
    Que5Btn.setColour(juce::TextButton::buttonOnColourId, juce::Colours::lightpink);
    Que6Btn.setColour(juce::TextButton::buttonOnColourId, juce::Colours::lightpink);
    Que7Btn.setColour(juce::TextButton::buttonOnColourId, juce::Colours::lightpink);
    Que8Btn.setColour(juce::TextButton::buttonOnColourId, juce::Colours::lightpink);


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


    // Change colour scheme
    loopBtn.setColour(1, juce::Colours::yellow);
    queEditBtn.setColour(1, juce::Colours::mediumvioletred);
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

    loopBtn.setBounds(getWidth() * 1 / 4, 0, getWidth() / 4, getHeight() / 6);

    queEditBtn.setBounds(getWidth() * 1 / 2, 0, getWidth() /4, getHeight()/6);

    Que1Btn.setBounds(getWidth() * 2 / 8, getHeight() * 1 / 6, getWidth()/8, getHeight()/6);
    Que2Btn.setBounds(getWidth() * 3 / 8, getHeight() * 1 / 6, getWidth()/8, getHeight()/6);
    Que3Btn.setBounds(getWidth() * 4 / 8, getHeight() * 1 / 6, getWidth()/8, getHeight()/6);
    Que4Btn.setBounds(getWidth() * 5 / 8, getHeight() * 1 / 6, getWidth()/8, getHeight()/6);
    Que5Btn.setBounds(getWidth() * 2 / 8, getHeight() * 2 / 6, getWidth()/8, getHeight()/6);
    Que6Btn.setBounds(getWidth() * 3 / 8, getHeight() * 2 / 6, getWidth()/8, getHeight()/6);
    Que7Btn.setBounds(getWidth() * 4 / 8, getHeight() * 2 / 6, getWidth()/8, getHeight()/6);
    Que8Btn.setBounds(getWidth() * 5 / 8, getHeight() * 2 / 6, getWidth()/8, getHeight()/6);

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
        thumbChange();
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
                    // Successfull load callback
                    fileLoaded(file);
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

// Successfull file load callback
void PlayerGUI::fileLoaded(juce::File file)
{
    // Change state
    player->changeState(Player::PlayerState::Stopped);

    // Enable btns after file is loaded
    playBtn.setEnabled(true);                                      // OPTIMISE!

    loopBtn.setEnabled(true);
    queEditBtn.setEnabled(true);

    Que1Btn.setEnabled(true);
    Que2Btn.setEnabled(true);
    Que3Btn.setEnabled(true);
    Que4Btn.setEnabled(true);
    Que5Btn.setEnabled(true);
    Que6Btn.setEnabled(true);
    Que7Btn.setEnabled(true);
    Que8Btn.setEnabled(true);

    // Change text
    playBtn.setButtonText("Play");
    stopBtn.setButtonText("Stop");

    // Iterate over all que data
    for (int i = 0; i < 8; ++i)
    {
        // Reset to zero
        player->setHotQue(i, 0.0);
    }

    // Toggle all queBtns off
    queBtnsOff();

    // Restore loop setting
    player->setLooping(loopBtn.getToggleState());

    // Pass the audio data to the AudioThumb object to draw the waveform 
    (waveform->getAudioThumb()) ->
        setSource(new juce::FileInputSource(file));
};


void PlayerGUI::loopBtnClick()
{
    // Set button text depending on the btn state
    if (loopBtn.getToggleState())
    {
        loopBtn.setButtonText("Loop: ON");
    }
    else
    {
        loopBtn.setButtonText("Loop: OFF");
    }

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

// Callback function for the hotQue
void PlayerGUI::queEditClick()
{
    // Set button text depending on the btn state
    if (queEditBtn.getToggleState())
    {
        queEditBtn.setButtonText("QUE EDIT: ON");
    }
    else
    {
        queEditBtn.setButtonText("QUE EDIT: OFF");
    }

    // Set que edit mode
    player->setQueEdit(queEditBtn.getToggleState());
};

// Callback function for the hotQue
void PlayerGUI::hotQueClick(juce::TextButton* btnAddr) const
{
    // If no file loaded, do nothing and stop execution
    if (!(player->rdrSrcNotEmpty()))
        return;

    // Initialize index out of range
    int ind = -1;

    // Depending on the caller, set correct index
    if (btnAddr == &Que1Btn)
    {
        ind = 0;
    }
    else if (btnAddr == &Que2Btn)
    {
        ind = 1;
    }
    else if (btnAddr == &Que3Btn)
    {
        ind = 2;
    }
    else if (btnAddr == &Que4Btn)
    {
        ind = 3;
    }
    else if (btnAddr == &Que5Btn)
    {
        ind = 4;
    }
    else if (btnAddr == &Que6Btn)
    {
        ind = 5;
    }
    else if (btnAddr == &Que7Btn)
    {
        ind = 6;
    }
    else if (btnAddr == &Que8Btn)
    {
        ind = 7;
    }

    // If edit mode is ON
    if (player->getQueEdit())
    {
        // Store current timestamp to the HotQue slot
        player->setHotQue(ind, player->getPosRel());

        // Set button state to indicate that Que is loaded
        btnAddr -> setToggleState(true, juce::NotificationType::dontSendNotification);
    }
    // If edit mode is OFF
    else
    {
        // If button is not loaded, do nothing and stop execution
        if (!(btnAddr->getToggleState()))
            return;

        // Retrive timestamp
        double timestamp = player->getHotQue(ind);

        // Set player position to the timestamp
        player->setPosRel((float)timestamp);
    }
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
void PlayerGUI::thumbChange()
{
    // Update visuals
    waveform -> repaint();
};

// Toggle off all HotQue btns
void PlayerGUI::queBtnsOff()
{
    Que1Btn.setToggleState(false, juce::NotificationType::dontSendNotification);
    Que2Btn.setToggleState(false, juce::NotificationType::dontSendNotification);
    Que3Btn.setToggleState(false, juce::NotificationType::dontSendNotification);
    Que4Btn.setToggleState(false, juce::NotificationType::dontSendNotification);
    Que5Btn.setToggleState(false, juce::NotificationType::dontSendNotification);
    Que6Btn.setToggleState(false, juce::NotificationType::dontSendNotification);
    Que7Btn.setToggleState(false, juce::NotificationType::dontSendNotification);
    Que8Btn.setToggleState(false, juce::NotificationType::dontSendNotification);
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
        // File
        juce::File file{ files[0] };

        // If file opened successfully
        if (player->openFile(juce::URL{ file }))
        {
            fileLoaded(file);
        };


    }
};