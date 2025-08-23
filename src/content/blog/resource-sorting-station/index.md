---
title: 'Resource Sorting Station'
description: 'A sustainability project built with Zero Waste NUS'
date: 2025-04-24
tags: ['Recycling', 'Sustainability', 'C++', 'Embedded Systems', 'ESP32', 'RPi', 'MQTT', 'Arduino IDE', 'Linux']
image: './1200x630.png'
authors: ['Brendan']
---

import Callout from '@/components/Callout.astro'
import { Icon } from 'astro-icon/components'

## So the school spent $40 000 on a resource sorting station...

With the aim of increasing recycling rates among students in order to achieve its goal of being a zero waste campus by 2030.

Yet, the data showed that hardly any students were using the spanking new recycling solution, and recycling rates reported only slight increases since the incorporation of the machine.

Our team worked with University Campus Infrastructure (UCI), under the guidance of Dr Elliot Law, to design a new recycling sorting center (RSS) that would finally get students to start using it.

### The identified problems

### Our solution

An IOT-enabled RSS with the following features:
1. Modular recycling bin with communication between individual bin modules (ESP32) and the main module (RPi) via the MQTT communication protocol, served to the user over a self-hosted GUI built with fastAPI. The modular system would allow university services to add or remove recycling bins as needed in higher foot traffi c areas or areas requiring a specifi c type of material to be recycled.
2. reliminary user testing with the new system showed a 30% decrease in time taken for users to recycle.
1. Integration with pocketbase allowed users to track their recycling habits and past history, allowing NUS access to this data to run recycling campaigns and reward programmes.
