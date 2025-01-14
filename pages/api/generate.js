import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
})

const openai = new OpenAIApi(configuration);

const basePromptPrefix = "Pretend you are a 1 year old that knows everything. Answer with lots of grammatical errors and funny sentences. Make sure to include references to poop, or pooping.";
const generateAction = async (req, res) => {
    // run first prompt
    console.log(`API: ${basePromptPrefix}${req.body.userInput}`)

    const baseCompletion = await openai.createCompletion({
        model: 'text-davinci-003',
        prompt: `${basePromptPrefix}${req.body.userInput}`,
        temperature: 0.7,
        max_tokens: 250,
    });

    const basePromptOutput = baseCompletion.data.choices.pop();

    res.status(200).json({output: basePromptOutput});
}

export default generateAction;