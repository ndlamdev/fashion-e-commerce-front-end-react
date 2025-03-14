/**
 * Author: Nguyen Dinh Lam
 * Email: kiminonawa1305@gmail.com
 * Phone number: +84 855354919
 * Create at: 10:46AM - 13/03/2025
 * User: lam-nguyen
 **/

import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";

const VoiceSearch = () => {
	const { transcript, listening } = useSpeechRecognition();

	if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
		return <p>Sorry, your browser does not support speech recognition.</p>;
	}

	return (
		<div>
			<button onClick={() => SpeechRecognition.startListening({ language: "vi-VN" })}>Start</button>
			<br />
			<button onClick={() => SpeechRecognition.stopListening()}>Stop</button>
			<p>{listening ? "Listening..." : 'Click "Start" to start listening'}</p>
			<p>{transcript}</p>
		</div>
	);
};

export default VoiceSearch;
