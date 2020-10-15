<p align="center">
  <a href="" rel="noopener">
 <img width=350px height=350px src="https://raw.githubusercontent.com/RobertBroersma/funk/main/logo.svg" alt="Project logo"></a>
</p>

<div align="center">

[![Status](https://img.shields.io/badge/status-active-success.svg)]()
[![GitHub Issues](https://img.shields.io/github/issues/RobertBroersma/funk.svg)](https://github.com/RobertBroersma/funk/issues)
[![GitHub Pull Requests](https://img.shields.io/github/issues-pr/RobertBroersma/funk.svg)](https://github.com/RobertBroersma/funk/pulls)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](/LICENSE)

</div>

---

<p align="center"> Unstyled, funktional components for React
    <br> 
</p>

## 📝 Table of Contents

- [About](#about)
- [Getting Started](#getting_started)
- [Usage](#usage)

## 🧐 About <a name = "about"></a>

This project contains a set of unstyled, accessible components for React, designed to work with class-based style systems.

## 🏁 Getting Started <a name = "getting_started"></a>

### Installing

```
npm install @statikly/funk --save
```

Or

```
yarn add @statikly/funk
```

## 🎈 Usage <a name="usage"></a>

At the moment there is one component, `TabGroup`

### Example

```tsx
import { TabGroup } from '@statikly/funk';

function TabButton({ index, title }) {
  return (
    <TabGroup.Tab
      index={index}
      className="text-indigo-700 font-bold text-xs uppercase tracking-wider px-3 inline-block rounded-full mb-2 focus:outline-none focus:bg-indigo-200"
      activeClassName="bg-indigo-300"
      inactiveClassName="hover:bg-indigo-200"
    >
      {title}
    </TabGroup.Tab>
  );
}

export default function Vertical() {
  return (
    <TabGroup numTabs={2}>
      <div className="py-6 md:py-12 container mx-auto">
        <div className="p-8">
          <div className="text-center max-w-screen-md mx-auto">
            <h2 className="font-bold text-4xl lg:text-4xl leading-tight">
              A quick tour
            </h2>
            <p className="pt-4 text-gray-600 text-lg">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean
              nec ex sed nulla.
            </p>
          </div>
          <TabGroup.TabList className="pt-8 grid grid-flow-col justify-center gap-3">
            <TabButton index={0} title="Copy &amp; paste" />

            <TabButton index={1} title="Casual fridays" />
          </TabGroup.TabList>

          <div className="pt-6 relative flex justify-center">
            <TabGroup.TabPanel
              index={0}
              as="img"
              className="absolute rounded shadow-xl transform transition-all duration-500"
              activeClassName="translate-y-0 opacity-1"
              inactiveClassName="opacity-0 translate-y-2"
              src="https://images.unsplash.com/photo-1583308148228-adac08432fc1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&h=450&q=80"
            />
            <TabGroup.TabPanel
              index={1}
              as="img"
              className="absolute rounded shadow-xl transform transition-all duration-500"
              activeClassName="translate-y-0 opacity-1"
              inactiveClassName="opacity-0 translate-y-2"
              src="https://images.unsplash.com/photo-1588769557939-76552854025b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&h=450&q=80"
            />
          </div>
        </div>
      </div>
    </TabGroup>
  );
}
```
