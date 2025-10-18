import { Fragment } from "react";

type Step = {
	id: number;
	title: string;
	content?: React.ReactNode;
};

type StepProps = {
	steps: Step[];
	currentStep: number;
};

const MultiStepForm = ({ steps, currentStep }: StepProps) => {
	return (
		<div className="md:max-w-5xl mx-auto p-4 text-black font-base">
			<div className="md:flex items-center justify-between mb-8 hidden">
				{steps.map((step, index) => (
					<Fragment key={step.id}>
						<div className="flex items-center mx-4">
							<div
								className={`rounded-full h-12 w-12 flex items-center justify-center text-white ${
									currentStep >= step.id ? "bg-purple-200" : "bg-gray-400"
								}`}
							>
								{step.id}
							</div>
							<div className="ml-2 text-xl font-medium ">{step.title}</div>
						</div>
						{index < steps.length - 1 && (
							<div
								className={`flex-1 h-1 ${
									currentStep > step.id ? "bg-purple-200" : "bg-gray-400"
								}`}
							></div>
						)}
					</Fragment>
				))}
			</div>

			<div className="mb-4">
				<h2 className="text-2xl font-bold mb-4 flex justify-center">
					{steps[currentStep - 1].title}
				</h2>
			</div>
		</div>
	);
};

export { MultiStepForm };
export type { Step, StepProps };
