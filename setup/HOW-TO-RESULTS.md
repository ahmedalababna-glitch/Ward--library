# Connect the results store (one time, about 5 minutes)

The site saves every pre-test and post-test to a Google Sheet in **your** Google account.
You never need to open the Sheet: the Admin page on the site shows the results and the analysis.
A computer is easiest for these steps.

1. Open https://script.google.com and click **New project** (on a phone: Safari, then **aA → Request Desktop Website**).
2. (The script makes its own Sheet called `Ward Library results` in your Google Drive the first time a result arrives.)
3. Delete what is in the editor, then paste all of `setup/results-script.gs` from this repository.
4. On the line `const ADMIN_PIN = "1234";` change `1234` to your own PIN. Click **Save** (disk icon).
5. Click **Deploy → New deployment**. Click the gear next to "Select type" and choose **Web app**.
   - Execute as: **Me**
   - Who has access: **Anyone**

   Click **Deploy**, then **Authorize access**, and choose your account. If Google shows
   "Google hasn't verified this app", click **Advanced → Go to … (unsafe)** (it is your own script), then **Allow**.
6. Copy the **Web app URL** (it ends with `/exec`) and send it to Claude, or paste it into `config.js`
   between the quotes: `const RESULTS_URL = "https://script.google.com/macros/s/…/exec";`

Done. Open the site's **Admin** link (bottom of the main page) and enter your PIN.

**Privacy:** the Sheet holds staff names and scores, so keep it private (don't share the Sheet link).
Anyone with the PIN can see the results on the Admin page, so choose a PIN only the QI team knows.

---

## بالعربي

1. افتح https://sheets.new وسمّيه `Ward Library results`.
2. من القائمة: **Extensions ← Apps Script**.
3. امسح الموجود، والصق كل محتوى الملف `setup/results-script.gs`.
4. غيّر `1234` لرمز خاص فيك، واضغط **Save**.
5. **Deploy ← New deployment ← (الترس) Web app**، وبعدين: Execute as: **Me**، Who has access: **Anyone** ← **Deploy** ← **Authorize access**. إذا طلعت رسالة "hasn't verified"، اضغط **Advanced** ← **Go to… (unsafe)** ← **Allow** (هاد السكربت تبعك أنت).
6. انسخ الـ **Web app URL** (بينتهي بـ `/exec`) وابعتلي ياه.
