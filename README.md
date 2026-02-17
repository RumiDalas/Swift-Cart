#### 1) What is the difference between `null` and `undefined`? 

Answer : যখন কোনো ভ্যারিয়েবল declare করা হয় কিন্তু value assign করা হয় না, তখন তার মান undefined হয়। JavaScript নিজে থেকে undefined সেট করে।null মানে ইচ্ছা করে খালি / no value সেট করা হয়েছে। এটা developer নিজে assign করে।

#### 2) What is the use of the `map()` function in JavaScript? How is it different from `forEach()`?

Answer: map() array এর প্রতিটি element এর উপর loop চালায় এবং নতুন একটি array return করে — যেখানে modified / transformed value থাকে।forEach() শুধু loop চালায়, কিন্তু কোনো নতুন array return করে না। 

#### 3) What is the difference between `==` and `===`?
Answer: == শুধু value compare করে | === value + type দুটোই compare করে | 

#### 4) What is the significance of `async`/`await` in fetching API data?
Answer : যখন আমরা API থেকে data আনি, তখন data আসতে একটু সময় লাগে।
এই wait করার কাজ সহজভাবে handle করার জন্য async / await ব্যবহার করি।

#### 5) Explain the concept of Scope in JavaScript (Global, Function, Block).
Answer : Scope মানে → variable কোথা থেকে access করা যাবে (কোথায় ব্যবহার করা যাবে)|
JavaScript এ মূলত 3 ধরনের scope আছে:
Global Scope ,Function Scope ,Block Scope
যে variable function বা block এর বাইরে declare করা হয়, সেটা global scope।এটা সব জায়গা থেকে access করা যায়।যে variable function এর ভিতরে declare করা হয়, সেটা শুধু ওই function এর ভিতরেই কাজ করবে।Function এর ভিতরের variable → বাইরে থেকে access করা যায় না | Function এর ভিতরের variable → বাইরে থেকে access করা যায় না | let এবং const → block scope follow করে ?
