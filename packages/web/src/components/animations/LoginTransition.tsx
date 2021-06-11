import React from "react";
import { Flex } from "@chakra-ui/layout";
import { CSSTransition } from "react-transition-group";
import "./login-transition.scss";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { History } from "history";
import { Box } from "@chakra-ui/react";

interface Props extends RouteComponentProps {
	animationState: boolean;
	startAnimation: React.Dispatch<React.SetStateAction<boolean>>;
	redirectUrl: string;
	history: History;
}

const LoginTransition: React.FC<Props> = ({
	animationState,
	startAnimation,
	redirectUrl,
	history,
}) => {
	return (
		<Box
			position="absolute"
			w="100vw"
			h="100vh"
			top="0"
			left="0"
			pointerEvents="none"
		>
			<CSSTransition
				in={animationState}
				timeout={2000}
				classNames="liquid"
				unmountOnExit
				onEnter={() => {
					setTimeout(() => startAnimation(false), 2000);
				}}
				onExited={() => {
					history.push(redirectUrl);
				}}
			>
				<div className="animation-box">
					<Flex
						alignItems="center"
						justifyContent="center"
						h="100%"
						w="100%"
						position="absolute"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="316"
							height="138"
							viewBox="0 0 316 138"
							id="logo"
						>
							<defs>
								<clipPath id="clip-white">
									<rect width="316" height="138" />
								</clipPath>
							</defs>
							<g id="white" clipPath="url(#clip-white)">
								<rect width="316" height="138" fill="rgba(255,255,255,0)" />
								<path
									id="Pfad_9"
									data-name="Pfad 9"
									d="M38.989,116.346a19.95,19.95,0,0,1-9.653,2.019q-16.972,0-16.972-18.928V61.2H1.26V52.371h11.1V36.6l10.347-3.344V52.371H38.989V61.2H22.711v36.4q0,6.5,2.208,9.275t7.319,2.776a10.878,10.878,0,0,0,6.751-2.145Zm19.117-80.38a6.556,6.556,0,0,1-4.732-1.893,6.388,6.388,0,0,1-1.956-4.8,6.626,6.626,0,0,1,6.688-6.751,6.682,6.682,0,0,1,4.827,1.924,6.74,6.74,0,0,1,0,9.558A6.625,6.625,0,0,1,58.106,35.967Zm5.047,81.011H52.806V52.371H63.153Zm76.089,0H128.9V106h-.252q-7.193,12.492-22.208,12.492-12.177,0-19.464-8.675T79.683,86.188q0-16.025,8.076-25.679t21.514-9.653q13.312,0,19.369,10.473h.252v-40h10.347ZM128.9,87.766V78.239a18.483,18.483,0,0,0-5.174-13.249A17.352,17.352,0,0,0,110.6,59.563q-9.464,0-14.89,6.94t-5.426,19.18q0,11.167,5.205,17.634a17.012,17.012,0,0,0,13.975,6.467,17.672,17.672,0,0,0,14.038-6.246Q128.9,97.293,128.9,87.766Zm36.594-51.8a6.556,6.556,0,0,1-4.732-1.893,6.388,6.388,0,0,1-1.956-4.8,6.626,6.626,0,0,1,6.688-6.751,6.682,6.682,0,0,1,4.827,1.924,6.74,6.74,0,0,1,0,9.558A6.625,6.625,0,0,1,165.489,35.967Zm5.047,81.011H160.189V52.371h10.347Zm52.871-86.563a13.783,13.783,0,0,0-6.877-1.7q-10.852,0-10.852,13.691v9.969h15.142V61.2H205.679v55.774H195.395V61.2H184.354V52.371h11.041V41.9q0-10.158,5.868-16.057a19.809,19.809,0,0,1,14.637-5.9,20.275,20.275,0,0,1,7.508,1.136Zm59.938,21.956-29.716,74.954q-7.95,20.063-22.335,20.063a23.674,23.674,0,0,1-6.751-.82v-9.275a19.178,19.178,0,0,0,6.12,1.136q7.823,0,11.735-9.338l5.174-12.24-25.237-64.48h11.483l17.477,49.717q.315.946,1.325,4.921H253q.315-1.514,1.262-4.8l18.36-49.843Zm14.7,65.995a6.7,6.7,0,0,1-4.953-2.082,6.853,6.853,0,0,1-2.051-4.984,6.959,6.959,0,0,1,2.051-5.016,6.648,6.648,0,0,1,4.953-2.114,6.822,6.822,0,0,1,5.047,2.114,6.9,6.9,0,0,1,2.082,5.016,6.8,6.8,0,0,1-2.082,4.984A6.873,6.873,0,0,1,298.046,118.365Z"
									transform="translate(5 -14.267)"
									fill="#fff"
									stroke="#fff"
									strokeWidth="9"
								/>
							</g>
						</svg>
					</Flex>
				</div>
			</CSSTransition>
		</Box>
	);
};

export default withRouter<Props, any>(LoginTransition);

