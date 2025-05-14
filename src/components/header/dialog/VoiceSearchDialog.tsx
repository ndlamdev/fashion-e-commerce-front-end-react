/**
 * Author: Nguyen Dinh Lam
 * Email: kiminonawa1305@gmail.com
 * Phone number: +84 855354919
 * Create at: 3:45 AM - 15/05/2025
 *  User: kimin
 **/

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog.tsx";
import { hiddenDialog } from "@/redux/slice/dialog.slice.ts";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/configs/store.config.ts";
import { useEffect, useState } from "react";
import microIcon from "@/assets/images/icons/voice.png";
import voiceRecordingAnimation from "@/assets/videos/voice_recording_animation.mp4";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";
import { useNavigate } from "react-router";

function VoiceSearchDialog() {
	const dispatch = useDispatch();
	const { dialog } = useSelector((state: RootState) => state.dialog);
	const [localDialog, setLocalDialog] = useState<"dialog" | "none">("none");
	const { transcript, listening } = useSpeechRecognition();
	const navigation = useNavigate();

	useEffect(() => {
		if (dialog !== "voice-search") return;
		setLocalDialog("dialog");
	}, [dialog]);

	if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
		return <p>Sorry, your browser does not support speech recognition.</p>;
	}

	return (
		<Dialog open={localDialog === "dialog"}>
			<DialogContent
				aria-describedby={""}
				className={"sm:max-w-[525px]"}
				onClosed={() => {
					setLocalDialog("none");
					dispatch(hiddenDialog());
				}}
				classIcon={"bg-black p-4 border-2 border-gray-200 text-white !rounded-full top-[-20px] right-[-20px]"}>
				<DialogHeader>
					<DialogTitle className={"text-center text-4xl"}>Tìm kiếm bằng âm thanh</DialogTitle>
					<DialogDescription className={"text-center"}>Nhấn vào biểu tượng micro và bắt đầu nói để thự hiện tìm kiếm</DialogDescription>
				</DialogHeader>
				<div className={"flex h-[200px] flex-col items-center justify-center lg:h-[250px]"}>
					{listening ? (
						<>
							<video
								src={voiceRecordingAnimation}
								loop={true}
								autoPlay={true}
								onClick={() => {
									SpeechRecognition.stopListening().then(() => {
										if (!transcript) return;
										navigation("/collection", {
											state: {
												prompt: transcript,
											},
										});
									});
								}}
							/>
							<div className={"w-full text-left"}>Tìm kiếm: {transcript}</div>
						</>
					) : (
						<img
							src={microIcon}
							alt={"voice icon.png"}
							className={"block h-[100px] w-[100px] cursor-pointer transition-all duration-500 hover:opacity-80 lg:h-[125px] lg:w-[125px]"}
							onClick={() => SpeechRecognition.startListening({ language: "vi-VN" })}
						/>
					)}
				</div>
			</DialogContent>
		</Dialog>
	);
}

export default VoiceSearchDialog;
