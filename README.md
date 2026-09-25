# Monthsary Gift Page 💗

A single-page GitHub Pages gift website with:

- Playful pink gift-box opening screen
- Floating lanterns
- Touch/drag lantern interaction on phones
- Four-digit numeric lock
- Pink heart keypad
- Second scene with photos and a handwritten-style letter
- Final bold "Happy third monthsary, my beautiful baby."

## 1. Files

Keep this structure:

```text
your-repository/
├── index.html
├── style.css
├── script.js
└── assets/
    ├── gift-box.png
    ├── lantern.png
    ├── photo1.jpg
    ├── photo2.jpg
    ├── photo3.jpg
    ├── photo4.jpg
    ├── photo5.jpg
    ├── photo6.jpg
    ├── photo7.jpg
    └── photo8.jpg
```

The included PNG/JPG placeholders are not required. Replace them with your own files.

## 2. Replace the gift box

Put your own transparent PNG inside `assets/`.

Recommended filename:

```text
assets/gift-box.png
```

If you want another filename, edit this line in `index.html`:

```html
<img id="giftImage" src="assets/gift-box.png" alt="Gift box">
```

A transparent PNG with the box centered and no large empty border usually looks best.

## 3. Replace the lantern

Put your lantern PNG here:

```text
assets/lantern.png
```

The JavaScript automatically creates 32 copies with different sizes, positions, speeds, opacity, and animation delays.

Change the amount here in `script.js`:

```js
const LANTERN_COUNT = 32;
```

Try 20–50 for a good balance on phones.

The lanterns can be touched and dragged. The drag interaction uses Pointer Events, so it works with touchscreens as well as a mouse.

## 4. Set the four-digit password

Open `script.js` and find:

```js
const UNLOCK_CODE = "1234";
```

Change only the four digits, for example:

```js
const UNLOCK_CODE = "7391";
```

Do not put spaces in the code.

Important: because this is a static GitHub Pages website, the password is not a secure/private password. Someone who inspects the website files can find it. It is intended as a cute interactive lock, not real security.

## 5. Add your photos

The default setup has **8 photo slots**.

Put your images in:

```text
assets/
```

Then name them:

```text
photo1.jpg
photo2.jpg
photo3.jpg
photo4.jpg
photo5.jpg
photo6.jpg
photo7.jpg
photo8.jpg
```

If your photos are PNG files, that's okay. Just change the filenames in `script.js`.

Find:

```js
const PHOTOS = [
  "photo1.jpg",
  "photo2.jpg",
  "photo3.jpg",
  "photo4.jpg",
  "photo5.jpg",
  "photo6.jpg",
  "photo7.jpg",
  "photo8.jpg"
];
```

For example:

```js
const PHOTOS = [
  "our-first-photo.jpg",
  "beach.png",
  "selfie-3.jpg",
  "memory4.jpg"
];
```

You can use fewer than 8. The page will automatically create only the photos listed.

You can also use more than 8 by adding more filenames to the array.

### Recommended photo sizes

You don't need to resize everything perfectly. The page crops each photo into a square frame automatically.

Good choices:

- Portrait: 4:5 or 3:4
- Square: 1:1
- Landscape: 4:3 or 16:9

The CSS uses `object-fit: cover`, so the photos won't stretch.

## 6. Write the letter

Open `index.html`.

Find:

```html
<!-- EDIT YOUR LETTER BELOW -->
<div id="letterText">
```

Replace the example paragraphs with your own.

Use normal HTML paragraphs:

```html
<div id="letterText">
  <p>My beautiful baby,</p>

  <p>
    Your first paragraph goes here.
  </p>

  <p>
    Your second paragraph goes here.
  </p>

  <p>
    I love you so much.<br>
    Your name ♡
  </p>
</div>
```

The letter is intentionally long-form and scrollable on mobile.

## 7. Change the final monthsary message

In `index.html`, find:

```html
<p class="monthsary">Happy third monthsary, my beautiful baby.</p>
```

Edit it if you want a different final message.

## 8. GitHub Pages

1. Create a new GitHub repository.
2. Upload:
   - `index.html`
   - `style.css`
   - `script.js`
   - the entire `assets` folder
3. Commit the files.
4. Open the repository's **Settings**.
5. Open **Pages**.
6. Under the deployment/source option, select the branch containing your files (usually `main`) and the root `/` folder.
7. Save.
8. GitHub will give you a Pages URL.

Your `index.html` must stay in the repository root unless you intentionally configure a different folder.

## 9. If an image does not appear

Check the spelling carefully.

For example:

```text
assets/photo1.jpg
```

is different from:

```text
assets/Photo1.JPG
```

GitHub Pages is case-sensitive.

Also make sure the image is actually uploaded into the `assets` folder.

## 10. Changing the look

Most visual settings are near the top of `style.css`.

Useful variables:

```css
:root {
  --pink: #f7c6d6;
  --pink-deep: #df7194;
  --pink-dark: #9b4968;
  --green: #74a97d;
  --cream: #fff7ef;
  --ink: #633b4b;
  --paper: #f7edda;
}
```

You can change these colors without touching the JavaScript.

## 11. Important note about the password

This is a front-end/static website. The code is delivered to the visitor's browser, so the four-digit code can be discovered by someone who knows how to inspect website files.

If the goal is a romantic surprise rather than actual security, this setup is perfect. For real private content, you would need server-side authentication and shouldn't put the private letter/photos directly in a public GitHub Pages repository.
