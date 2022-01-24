#include "MainComponent.h"
#include <iostream>
#include <string>

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

    addAndMakeVisible(playButton);  // Play audio btn
    addAndMakeVisible(stopButton);  // Stop audio btn
    addAndMakeVisible(loadFile);    // Load file btn

    addAndMakeVisible(volSlider);   // Volume slider
    addAndMakeVisible(speedSlider); // Speed slider
    addAndMakeVisible(timeSlider);  // Timestamp slider

    volSlider.setRange(0, 1);   // Limit volume from 0 to 1

    playButton.addListener(this);   // Add listener to play btn
    stopButton.addListener(this);   // Add listener to stop btn
    loadFile.addListener(this);     // Add listener to load file btn

    volSlider.addListener(this);    // Add listener to volume slider
    speedSlider.addListener(this);  // Add listener to speed slider
    timeSlider.addListener(this);   // Add listener to timstamp slider
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

    // =====================================Syntesize audio
    // Initialize control variables
    playing = false;

    // Initialize audio variables
    phase = 0.0;
    dPhase = 0.0001;
    gain = 1;
    speed = 1;
    timestamp = 0;


    // =====================================Load files
    // Tell the format manager to register all formats
    formatManager.registerBasicFormats();


    // Because now transport source will play -> we pass this job to it, along with arguments from the MainComponent::prepareToPlay
    transportSource.prepareToPlay(samplesPerBlockExpected, sampleRate);
    // Also, pass to the wrapper
    resampleSource.prepareToPlay(samplesPerBlockExpected, sampleRate);
}

//=========================================================================================AudioSyntesize
//void MainComponent::getNextAudioBlock (const juce::AudioSourceChannelInfo& bufferToFill)
//{
//    // Your audio-processing code goes here!
//
//    // For more details, see the help for AudioProcessor::getNextAudioBlock()
//
//    // Right now we are not producing any data, in which case we need to clear the buffer
//    // (to prevent the output of random noise)
//
//    // If playing is disabled -> don't play
//    if (!playing)
//    {
//        // Clear buffer
//        bufferToFill.clearActiveBufferRegion();
//        // Stop execution
//        return;
//    }
//    // If playing is enabled
//    else{
//        // Setup access the audio buffer, so we can write directly to it
//        auto* leftChannel = bufferToFill.buffer->getWritePointer(0,
//            bufferToFill.startSample);
//        auto* rightChannel = bufferToFill.buffer->getWritePointer(1,
//            bufferToFill.startSample);
//
//        // Fill the buffer with samples (based on the buffer size)
//        for (auto i = 0; i < bufferToFill.numSamples; ++i) {
//            // Generate random noise and scale it down - Random waveform
//            //double sample = rng.nextDouble() * 0.125 * gain;
//            // Increment phase value
//            // phase += dPhase;
//
//            // Fmod will wrap value around (like module operation) - Sawtooth waveform
//            // double sample = fmod(phase, 1.0f);
//            // Increment phase value
//            // phase += dPhase;
//
//            // Sin waveform
//            // double sample = sin(phase) * 0.1;
//            // Increment phase value
//            // phase += dPhase;
//
//            // Reggae siren
//            double sample = fmod(phase, 1.0f);
//            // Increment phase value
//            phase += fmod(dPhase, 1.0f);
//            // Increment dPhase value
//            dPhase += 0.0000005f;
//
//            // Push sample to the right and left buffers
//            leftChannel[i] = sample * 0.125 * gain;
//            rightChannel[i] = sample * 0.125 * gain;
//
//        }
//    }
//
//}

void MainComponent::getNextAudioBlock (const juce::AudioSourceChannelInfo& bufferToFill)
{
    // Your audio-processing code goes here!

    // For more details, see the help for AudioProcessor::getNextAudioBlock()

    // Right now we are not producing any data, in which case we need to clear the buffer
    // (to prevent the output of random noise)

    // If player disabled
    if (!playing) {
        // Clear buffer
        bufferToFill.clearActiveBufferRegion();
        // End execution
        return;
    }
    // If player is active
    else {
        //// Simmilar to the MainComponent::prepareToPlay, we pass this job down to the transport source (+arguments)
        //transportSource.getNextAudioBlock(bufferToFill);
        // Because now the outmost audio layer is resampleSource, pass this job to it
        resampleSource.getNextAudioBlock(bufferToFill);
    }
}

void MainComponent::releaseResources()
{
    // This will be called when the audio device stops, or when it is being
    // restarted due to a setting change.

    // For more details, see the help for AudioProcessor::releaseResources()

    // Simmilar to the MainComponent::prepareToPlay, we pass this job down to the transport source (+arguments)
    transportSource.releaseResources();
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


    double rowH = getHeight() / 6;

    playButton.setBounds(0, 0, getWidth(), rowH);           // Setup play btn
    stopButton.setBounds(0, rowH, getWidth(), rowH);        // Setup stop btn

    volSlider.setBounds(0, 2 * rowH, getWidth(), rowH);     // Setup volume slider
    speedSlider.setBounds(0, 3 * rowH, getWidth(), rowH);   // Setup speed slider
    timeSlider.setBounds(0, 4 * rowH, getWidth(), rowH);    // Setup timestamp slider


    loadFile.setBounds(0, 5 * rowH, getWidth(), rowH);      // Setup loadfile btn



    DBG("Resized fired!\n");
}


//==============================================================================

void MainComponent::buttonClicked(juce::Button* btnP) {
    if (btnP == &playButton) {
        DBG("Play button was clicked! Start playing...\n");
        // Activate player
        playing = true;
        // Set initial dPhase to 0
        dPhase = 0;

        // Start from the begining
        transportSource.setPosition(0);
        // Start on the transport source level
        transportSource.start();
    }
    else if (btnP == &stopButton) {
        DBG("Stop button was clicked! Stop playing... \n");
        // Disable player
        playing = false;

        // Stop playing
        transportSource.stop();
    }
    else if (btnP == &loadFile) {
        DBG("Load file was clicked!... \n");
        // Create file chooser window
        juce::FileChooser chooser{"Select a file..."};
        // If user selects file
        if (chooser.browseForFileToOpen()){
            // Load audio file from the URL of the selected file
            loadURL(juce::URL{ chooser.getResult() });
        }
        DBG("Song length is "+std::to_string(transportSource.getLengthInSeconds()));
    }
};

void MainComponent::sliderValueChanged(juce::Slider* sldP) {
    if (sldP == &volSlider) {
        DBG("Volumeslider is fired!");
        
        // Get value from the slider
        gain = volSlider.getValue();
        // Set volume 
        transportSource.setGain(gain);

    }
    else if (sldP == &speedSlider) {
        DBG("Speedslider is fired!");

        // Get speed from the slider
        speed = speedSlider.getValue();
        // Set speed
        resampleSource.setResamplingRatio(speed);
    }
    else if (sldP == &timeSlider) {
        DBG("Timeslider is fired!");

        // Get timestamp
        timestamp = timeSlider.getValue();
        // Set timestamp
        transportSource.setPosition(timestamp);
    }
};

void MainComponent::loadURL(juce::URL fileURL) {

    // Create URL from the file
    //juce::URL audioURL{ "file:///F:/Study/Sem4/OOP/DJ_app/DJ_app/tracks/aon_inspired.mp3" };

    // Convert URL into input stream and Create reader from the input stream
    auto* reader = formatManager.createReaderFor(fileURL.createInputStream(false));
    // Check that file converted successfully
    if (reader == nullptr)
    {
        DBG("FAILED TO LOAD AUDIO FILE!");
    }
    if (reader != nullptr)
    {
        // Create source from the converted Reader
        std::unique_ptr<juce::AudioFormatReaderSource> newSource(new juce::AudioFormatReaderSource(reader, false));
        // Create transport source from the ReaderSource
        transportSource.setSource(newSource.get(), 0, nullptr, reader->sampleRate);
        /* Unique pointers are unique, so only one item can use them
           If there is a problem with creating FormatReaderSource ->
           local variable will cease to exist and release memory when function ends
           But if everything is ok, we need to transfer pointer to the class scope variable  */
        readerSource.reset(newSource.release());
    }
};