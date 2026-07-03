---
title: "Mixture Of Experts"
date: "2026-07-02"
tags: [machinelearning, LLMs, FOSS] 
description: "A breakdown of Mixture of Experts (MoE), exploring how DeepSeek revolutionized LLM efficiency through fine-grained experts, advanced gating functions, and smart routing."
permalink: posts/{{ title | slug }}/index.html
author_name: Lakshit Talreja 
author_link: "https://github.com/LakshitTalreja"
---

# Introduction 
It's 2026, everyone is using AI and LLM whether to write assignments or code, companies are racing to *AI-fy* their products and jump on the hype train. Amongst the sea of LLMs is **Deepseek**, Deepseek took the world by storm in December of 2024 and in this blog I'll be breaking down how they did it and why it changed the game.

# Deepseek Vs Other models 
![Deepseek](https://i.ibb.co/XPfF5vr/deepresize1-1024x684.jpg)

Until the release of deepseek the common consesus in the industry was that it takes hundreds of millions of dollars and months to train the LLMs we see, Deepseek on the other hand trained their **V3** model with roughly 5.5 million dollars and in 55 days. Now you dont have to be a tech enthusiast to see that these numbers are absolutely insane.
*Most LLMs predict the very next token. DeepSeek-V3 was trained to predict multiple future tokens at once.* 
Deepseek's multiple token prediction is the major reason they could complete the training of their model in such a short duration in comparision to other models.

So the question is how did they achieve these benchmarks?
Well the answer is they used *MoE(Mixture of Experts)*.

# What is Mixture of Experts(MoE)
MoE is a techinque where specialised sub networks(experts) are activated instead of activiating the whole model, but before we break that down we need to ask ourselves,


> ## What are experts 
> In a tradtional AI model, the model acts as a single complete brain whereas in MoE the brain is essetially spit into sub parts each tasked with handling only one task. *Each of these subparts can be considered to be experts.*
> 
> So in a MoE model, the experts are each tasked with solving or answering to certain inputs and are only activated when they are needed unlike the traditional model where the whole model is activated when it is given some input.

---


MoE isn't something new, it was introduced in the early 90s to improve the efficiency of neural networks but then why is it showing up now in deepseek's models and why hasn't it shown up before?

Well the model Deepseek V3 used isnt the trational MoE model but was a re-engineered MoE where **Fine Grained experts** were used.

To underestand this lets consider a football team of 4 players, 1 striker, 1 defender, 1 mid fielder and 1 goal keeper. In theory this team can play the match because we have a person for each of the positions but its evident that it wont be as good as having 11 players in a team where you can split roles like having 3 strikers, 1 for each side and 1 for the center.

Similary deepseek enhanced their number of experts from the trational model style of having *8 to having 256 experts per layer* and made sure that each of the experts only handles a small and niche dataset. 
But that doesnt mean that there 256 players on the field, the router looks through these 256 and pick the 8 most qualified to be activated. 

> But they also have something known as **Shared Experts** that is essentially the experts that are always active, this would be like the star player that is always on the field while the others keep swapping in and out. This is done because each input requires some knowledge.

# Basic design of MoE
![Design of MoE](https://i.ibb.co/1YRsBT6M/design-of-moe.png)
To understand this architecture lets break it down into smaller sections, putting it simply there is the input, output and the MoE layer.
In the MoE layer we have the Router/ Gating function and the then the experts.

## Router or Gating function 
Well this is like the coach of the team, it is the function that decides which expert will be active at what point. **The gating function is the mathematical impementation of a router.** 

> To select a Gating function, the function must follow few criteria 
> - The function should be able to accurately discern the characteristics of both the input and expert data. Essentially it must know about the data given by the user and must also know about the data in the experts. This allows it to assign the right data to the right expert, ensuring that each expert recieves a suffciently large and cohert dataset.
  > - The data should be evenly distributed to avoid model collapsse (I'll brief about this in a bit)
There are a few types of gating functions and the ones I'll be going over are the Linear, Non Linear and Sigmoid Gating functions .


### Linear Gating function / Softmax Gating 
Most existing MoE models use a linear **Softmax** function as their gating function due to its simplicity and effectiveness.
![Linear Gating](https://i.ibb.co/x8HK24vW/linear-gating.png)
Alright, so this is the general equation for linear gating so lets break down the terms and why we need them.
G is the gating function, TopK(...k) well what this function does is it takes a value for k and keeps the scores of the k best experts, then subtracts k from the total number of experts and to the remaining experts sets the score to minus infinity.

This saves time and energy by only using k parameters at a time. Rnoise adds a little randomness to the to the scores to prevent the model using only one or two experts. g(x) is the score of each expert and finally the softmax() wrap converts the score to probabilities that add up to one.
The score for the non selected experts was minus infinity so the probabilty is reduced to zero and therefore the model does not activate the expert.

> The only disadvantage to this gating function is that softmax must be computed for all experts resulting in higher compuatational costs.

### Non linear Gating / Cosine based grating 
This gating function is based on the cosine of the distance for domain generalization.
![Non Linear Gating](https://i.ibb.co/8gsKgJGn/non-linear-gating.png)
In the first gating function it asks itself the question *Which experts has the highest score* but in this function it asks the question *Which experts is the most similar to the given input*.

The formula is defiently more complex but lets break it down as well, 
Wlinear(x)- instead of calculating raw scores, it projects the input in a *hypersphere space* therefore aligning the inputs dimensionality with that of the experts.
E is the expert embeddings, each expert is represented by learnable feaature vector. The cosine term is the 
![Cosine Term](https://i.ibb.co/B2QG3FcW/cosine-term.png)
It measures the angle between the input and the experts and selects the experts based on the angle, the experts with the smallest angles to the input are activated.
Temperature, yup the last term is termperature(not the one we know) but this acts as a confidence dial,
low (eg. 0.1)- the top expert gets a large probabilty while others are 0.
high (eg. 2.0)- Probabilities are evenly spread out.

### Sigmoid Gating function (The function deepseek uses)
This is the function that the deepseek model uses, in this model the function assigns all the experts a value between 0 and 1 indepedent of the other expert functions, this is done in systems where multiple experts may need to be active or not active at the same time without affecting the scores of the other experts.
![Sigmoid](https://i.ibb.co/7JjxLnR9/sigmoid.png)
Unlike softmax where increasing the score of one expert decreases the scores of the others (*all must add to one*) this function allows all the experts to have high(near 1) or low(near 0) scores simultaneously.
It activates the experts like a activation function in a simple basic neural network, for example if G(x)>0.5 then it activates all the experts with gating values more than 0.5 

## Expert Networks 
This is the core component of the MoE, *By dynamically selecting the most suitable expert network through the gating function, MoE efficiently allocates input data, enabling different experts to specialize in distinct knowledge domains.*
Each expert in the MoE can function as a independent network model, however to ensure effciency and scalability, expert networks are often integrated into a single network model with specific layers replaced by MoE layers.
Currently the most used MoE layers are 


### Replace the FFN layer in Transformer with an MoE layer.
![FFN with Moe layer](https://i.ibb.co/Zp28cRGs/1-I-a-L-ZUhgk-Fg26-K8-Sul-Tpg.png)

In a standard transformer the Feed Forward Network(FFN) is a large dense block of neurons, every piece of input must go through every neuron, in this expert network you break down the FFN into tiny experts each responsible with handling only a certain type of data. This way the input data only goes through the relevant experts.
> **This reduces computational cost**

The router goes through the input and sends the input data to the relevant expert and the other experts don't consume energy.

### Apply MoE to the attention module in Transformer
MoE can also be added in the attention layer, though this isn't as popular as the first method it is still effective but the challenges lie in it's implementation. It is more complex and has massive Engineering challenges.

In a standard transformer, the attention forces every word(from the input) to pay attention to every other word under some pre defined parameters but when MoE is applied you replace the multi head attention with expert head attention where each expert is tasked with a different job, for example one expert may be tasked with linking verbs while the other might be tasked with focusing on words that are next to each other.
The router in this network directs the word to the experts, for example for a word like "the" or "a" it would send it to a low effort attention expert.

## Routing Strategy (Token Level Routing Strategy)
Most classical routing strategy, it uses token representations to determine the routing decisions. We mainly deal with two types of tokens, text tokens and patch (image) tokens.

- For Text tokens,
**MaskMoE** is used, essentially what the routing does is it underestands that not all words are as important and for words that occur only a few times it sends it to a single expert which results in that expert being trained perfectly for that word, whereas for common words it sends it to multiple experts so that they are trained to capture all contextual nuances.
> **This strategy uses a RNN model inside the router to give it memory.**
> It is called MaskMoE as it hides or shows the experts depending on the word.

- For patch tokens, 
this strategy divides the image into multiple patches and then routes each patch to the most suitable expert. It also introduces a Batch Priority Routing (BPR) which calculates the importance of each patch and then sorts them into descending order of importance and assigns experts to the patches accordingly.
*Experimental results demonstrate that BPR can maintain performance comparable to a dense model while processing only 15%-30% of the image patches, showcasing significant advantages by standard Routing.*


## Traning Strategies 
### Auxiliary loss
Along with the standard loss, another loss function known as the auxiliary loss is often introduced to prevent model collapse.
Before we understand how it does that lets understand what is model collapse
### Model Collapse (Rich get Richer)
It is the biggest problem one can face while creating/training a MoE, lets use another analogy, 

Consider the experts to be students in a class and the router to be the teacher so when the teacher(router) calls upon a student to answer the student can answer the question accurately or not accurately either ways the student learns and our goal is to have our experts learn as much as they can, but imagine this the teacher only calls upon their favourite students to answer everytime well then the favourite students learn more and faster than the others but what happens to the students that are never called upon, well they never learn.

>This is the basic premise of a model collapse in MoE, where few experts are regularly activated and end up training well but the ones that are never activated leading to an imbalance in expert utilization.

### How is this solved?
> [N. Shazeer, A. Mirhoseini, K. Maziarz, A. Davis, Q. Le, G. Hinton,and J. Dean, “Outrageously large neural networks: The sparsely-gated mixture-of-experts layer,” arXiv preprint arXiv:1701.06538, 2017.](https://arxiv.org/pdf/1701.06538)

This is a paper where they attempt to solve this issue and I'm going to attempt to break down their method.
They propose **Importance and Load Loss functions**  
![Switch Transformer](https://i.ibb.co/S44LV3gF/transformer.png)

Ok I know that's a lot of math and it probably confuses you, so lets just break it down and understand only what's relevant to the models we were learning.

In the switch Transformer it adds an Auxiliary loss that is essentially a penalty that forces the model to use all the experts, this prevents expert bias by the router and hence prevents model collapse.

The switch transformer is the equation 12 where f is the real workload of the function and Q is the predicted interest, this is basically the term that tells us how much the router wanted to send the token to that specific expert even if it didnt end up sending it, we use this value to understand routers and experts.

> The product of these terms is what the model is penalized on, if it has a high probability and a high number of tokens then it is penalized, to minimise this the model pushed both of these terms to 1/N(N is total number of experts) which is basically pushing it to an equal split for experts.

> What is alpha then, it is the parameter that controls how much the model cares about balancing the experts, if it is too low then the model collapses but if its too high then the model pushes the wrong data into the wrong expert just to keep the model alive.

A few extra terms I learnt while reading these papers,

- Expert capacity - it is the limit of data that a expert can handle, basically we dont want to overwhelm our experts with too much data.
If the Expert is **full** then the tokens are dropped out or passed without being processed.

- CoV - Coefficient of Variation measures how spread out the worload of the experts actually is, it doesnt just look at the average. A higher CoV means some of the experts are being overworked while the others are idle.


#### This is everything I learned while researching on MoE and reading a few papers on it, my next step would be to research on Hierchal MoE.

### References 
Here are papers and sites that I have used or intent to explore further 
- [Brief Analysis of deepseek R1](https://arxiv.org/html/2502.02523v1#bib.bib2)
- [Heirchal Moe](https://www.cs.toronto.edu/~hinton/absps/hme.pdf)


> This paper [A Comprehensive guide to MoE](https://arxiv.org/abs/2503.07137) was my introduction to MoE and has plenty of resources for one to refer.

### Thank you for reading!
