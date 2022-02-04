#include "MainComponent.h"

//==============================================================================
MainComponent::MainComponent()
{
    // Make sure you set the size of the component after
    // you add any child components.
    setSize (800, 600);

    // Some platforms require permissions to open input channels so request that here
    if (juce::RuntimePermissions::isRequired (juce::RuntimePermissions::recordAudio)
        && ! juce::RuntimePermissions::isGranted (juce::RuntimePermissions::recordAudio))
    {
        juce::RuntimePermissions::request (juce::RuntimePermissions::recordAudio,
                                           [&] (bool granted) { setAudioChannels (granted ? 2 : 0, 2); });
    }
    else
    {
        // Specify the number of input and output channels that we want to open
        setAudioChannels (2, 2);
    }

    addAndMakeVisible(player1GUI);
    addAndMakeVisible(player2GUI);
    addAndMakeVisible(waveform1);
    addAndMakeVisible(waveform2);
    addAndMakeVisible(mixerGUI);
    addAndMakeVisible(fileBrowser);
    addAndMakeVisible(library);
}

MainComponent::~MainComponent()
{
    // This shuts down the audio device and clears the audio source.
    shutdownAudio();
}

//==============================================================================
void MainComponent::prepareToPlay (int samplesPerBlockExpected, double sampleRate)
{
    // This function will be called when the audio device is started, or when
    // its settings (i.e. sample rate, block size, etc) are changed.

    // You can use this function to initialise any resources you might need,
    // but be careful - it will be called on the audio thread, not the GUI thread.

    // For more details, see the help for AudioProcessor::prepareToPlay()
}

void MainComponent::getNextAudioBlock (const juce::AudioSourceChannelInfo& bufferToFill)
{
    // Your audio-processing code goes here!

    // For more details, see the help for AudioProcessor::getNextAudioBlock()

    // Right now we are not producing any data, in which case we need to clear the buffer
    // (to prevent the output of random noise)
    bufferToFill.clearActiveBufferRegion();
}

void MainComponent::releaseResources()
{
    // This will be called when the audio device stops, or when it is being
    // restarted due to a setting change.

    // For more details, see the help for AudioProcessor::releaseResources()
}

//==============================================================================
void MainComponent::paint (juce::Graphics& g)
{
    // (Our component is opaque, so we must completely fill the background with a solid colour)
    g.fillAll (getLookAndFeel().findColour (juce::ResizableWindow::backgroundColourId));
    
    // You can add your drawing code here!

}

void MainComponent::resized()
{
    // This is called when the MainContentComponent is resized.
    // If you add any child components, this is where you should
    // update their positions.

    double wUnit = getWidth() / 10;
    double hUnit = getHeight() / 10;

    waveform1.setBounds(0, 0, getWidth(), hUnit * 1.25);
    waveform2.setBounds(0, hUnit * 1.25, getWidth(), hUnit * 1.25);
    player1GUI.setBounds(0, hUnit * 2.5, wUnit * 3.5, hUnit * 4.5);
    mixerGUI.setBounds(wUnit * 3.5, hUnit * 2.5, wUnit * 3, hUnit * 4);
    player2GUI.setBounds(wUnit * 6.5, hUnit * 2.5, wUnit * 3.5, hUnit * 4);
    fileBrowser.setBounds(0, hUnit * 6.5, wUnit * 3, hUnit * 3.5);
    library.setBounds(wUnit * 3, hUnit * 6.5, wUnit * 7, hUnit * 3.5);

}