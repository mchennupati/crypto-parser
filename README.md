If you have had the misfortune of trading spot margin on FTX  :) and have fill data, you can use this to aggregate all your trades, fees and balances in one place so that you can use a crypto tax filing software such as Accointing.

You can try it here:
https://ftx-fills-accointing.vercel.app/


You can directly paste the fills into the text area, this will then aggregate all of them, return a final trade date and balance.
You can then use this and tag each as margin_gain, margin_loss and then upload it to Accointing for e.g

You need to enter it in the raw format like this:
id	time	market	side	type	size	price	total	fee	feeCurrency
4936112359	2021-11-15T00:14:36.331945+00:00	SRM_LOCKED/SRM	sell	Unlock	0,04336754	1	0,04336754	0	SRM
4922565825	2021-11-14T00:47:59.160129+00:00	SRM_LOCKED/SRM	sell	Unlock	0,04336589	1	0,04336589	0	SRM
4907417604	2021-11-13T01:31:11.400770+00:00	SRM_LOCKED/SRM	sell	Unlock	0,04336423	1	0,04336423	0	SRM
4883504418	2021-11-12T00:54:57.984963+00:00	SRM_LOCKED/SRM	sell	Unlock	0,04336265	1	0,04336265	0	SRM![image](https://github.com/mchennupati/crypto-parser/assets/4135865/d198cfae-bfc3-416a-a371-fc9d7209f750)



The accointing template is here
https://www.accointing.com/app/templates/Accointing_template.xlsx

Please use at own risk and check if the numbers make sense when compared to what your actual pnl is.
