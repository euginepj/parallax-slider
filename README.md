#Parallax Slider by Oozou
Create a responsive parallax slider with beautiful CSS3 transition.

## Compatibility
Modern browsers such as Chrome, Firefox, and Safari on both desktop and smartphones have been tested. I have not tested this on IE.

## Basic Usage
First include the latest jQuery library, `jquery.oozou.slider.js` and `oozou.slider.css` into your document's `<head>`. Laid out your HTML markup as shown below:


````html
<div id="slide">
  <div class="os-inner ">
    <div class="active" data-background="background-image.jpg">
      <div class="os-content">...</div>
    </div>
    <div data-background="background-image.jpg">
      <div class="os-content">...</div>
    </div>
    ...
  </div>
  <div class="os-navigation" data-slider="slide">
	  <a href="#" class="os-prev">
		  &#10094;
		</a>
	  <a href="#" class="os-next">
	    &#10095;
	  </a>
	</div>
</div>
````

Make sure you change `background-image.jpg` to the source of your own image. Anything inside the `os-content` will be displayed as a caption of each slide. If you do not need navigation buttons, feel free to remove the `os-navigation` container out.

Now call the function:

````javascript
  $("#slide").slider();
````

## Available Options

````javascript
  $("#slide").slider({
    direction: "horizontal",
		loop: true,
		pagination: true,
		parallax: true,
		autoplay: false
  });
````

**Direction**
You can define the direction of the animation here. Available options are "horizontal" and "vertical". The default value is "horizontal"

**Loop**
You can set if you want the slider to loop here. Toggle this to false if you want to disable loop. The default value is true.

**Pagination**
You can enable/disable automatic pagination by toggling to true/false respectively. The default value is true.

**Parallax**
You can enable/disable parallax effect by toggling this option to true/false respectively. The default value is true.

**Autoplay**
You can turn on autoplay by toggling this option to true. The default value is false.
