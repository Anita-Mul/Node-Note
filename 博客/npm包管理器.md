1. ���°�
	`npm update`
	npm ���������������Ƿ����������İ汾���ƵĽ��°汾��
��Ҳ����ָ��һ�������и��£�
	`npm update <package-name>`
2. ʹ��-g����ȫ�ְ�װ
	`npm install -g lodash`
3. ���ʹ�û�ִ��npm��װ�������
	���װ��������ǿ�ִ���ļ��������ѿ�ִ���ļ�����node_modules/.bin/�ļ����¡�
	`npm install cowsay`
	���ִ�����������ִ���ļ��أ���Ȼ���Լ���./node_modules/.bin/cowsay������
	Ҳ����ֱ��`npx cowsay hello worls`��npx�����Զ��ҵ��������λ��
4. package.jsonָ��
	```json
	{
	  //����Ӧ�á����������
	  //�����Կ�����ΪGitHub�ֿ������
	  //���Ʊ�������214���ַ������ܰ����ո�ֻ�ܰ���Сд��ĸ�����ַ���-�����»��ߣ�_��
	  "name": "test-project",
	  //�г��������������
	  "author": "Joe <joe@whatever.com> (https://whatever.com)",
	  //�г������ߵ�����
	  "contributors": [
	    "Joe <joe@whatever.com> (https://whatever.com)",
	    "Joe <joe@whatever.com> (https://whatever.com)"
	  ],
	  //ָ����ǰ�汾
	  //��һ����������Ҫ�汾(�����п������ش�Ķ�)
	  //�ڶ��������Ǵ�Ҫ�汾�����������ݸ��ĵķ��а汾��
	  //�����������ǲ�������汾�����޸�����ķ��а棩
	  "version": "1.0.0",
	  //��Ӧ�ó���/������ļ�Ҫ˵��,���˽�������ڵ������ر�����
	  "description": "A Vue.js project",
	  //����Ӧ�ó������ڵ�
	  "main": "src/main.js",
	  //private�������Ϊtrue��ֹӦ�ó���/����������ⷢ����npm
	  "private": true,
	  //����һ��������еĽڵ�ű�
	  //����ͨ��npm run XXX / yarn XXX ������
	  "scripts": {
	    "dev": "webpack-dev-server --inline --progress --config build/webpack.dev.conf.js",
	    "start": "npm run dev",
	    "unit": "jest --config test/unit/jest.conf.js --coverage",
	    "test": "npm run unit",
	    "lint": "eslint --ext .js,.vue src test/unit",
	    "build": "node build/build.js"
	  },
	  //����npm��װΪ�������������б�
	  "dependencies": {
	    "vue": "^2.5.2"
	  },
	  //����npm��װΪ�����������������б�
	  "devDependencies": {
	    "autoprefixer": "^7.1.2",
	    "babel-core": "^6.22.1",
	    "babel-eslint": "^8.2.1",
	    "babel-helper-vue-jsx-merge-props": "^2.0.3",
	    "babel-jest": "^21.0.2",
	  },
	  //���ô˳����/Ӧ�ó������ĸ��汾��Node.js������
	  "engines": {
	    "node": ">= 6.0.0",
	    "npm": ">= 3.0.0",
	    "yarn": "^0.13.0",
	  },
	  //���ڸ�����Ҫ֧����Щ�����������汾��
	  "browserslist": [
	    "> 1%",
	    "last 2 versions",
	    "not ie <= 8"
	  ],
	  //���ӵ��������������������п�����GitHub����ҳ��
	  "bugs": "https://github.com/whatever/package/issues",
	  //���ó������ҳ
	  "homepage": "https://whatever.com/package",
	  //ָʾ����������֤
	  "license": "MIT",
	  //�����԰������������صĹؼ�������
	  "keywords": [
	    "email",
	    "machine learning",
	    "ai"
	  ],
	  //ָ�����������������ڵ�λ��
	  "repository": "github:whatever/testing",
	  //��������ʾ���ð汾����ϵͳ
	  /*
	  "repository": {
	    "type": "git", //Ҳ������"type": "svn",
	    "url": "https://github.com/whatever/testing.git"  //"url": "..."
	  }
	  */
	}
	```
5. ��װ��������
	```bash
	npm install --save-dev <PACKAGENAME>
	yarn add --dev <PACKAGENAME>
	```
6. package-lock.json�ļ�
	`npm install`����������������package.json�ļ���
7. ����npm������İ�װ�汾
![���������ͼƬ����](https://img-blog.csdnimg.cn/20210127093224653.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L0FuaXRhU3Vu,size_16,color_FFFFFF,t_70)
Ҳ���Դ�package-lock.json�ļ�����ʾ�����Ч����
`npm list -g`����ͬ�ģ����Ƕ���ȫ�ְ�װ�������
��ȡ�����������`npm list --depth=0`
![���������ͼƬ����](https://img-blog.csdnimg.cn/20210127093738815.png)
����ͨ���ض��������������ȡ��汾
![���������ͼƬ����](https://img-blog.csdnimg.cn/20210127093911120.png)
���Ҫ�鿴npm�洢��������������¿��ð汾��������npm view [package_name] version��
![���������ͼƬ����](https://img-blog.csdnimg.cn/2021012709401131.png)
8. �г������������ǰ�汾
	![���������ͼƬ����](https://img-blog.csdnimg.cn/2021012709435093.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L0FuaXRhU3Vu,size_16,color_FFFFFF,t_70)
9. ������Node.js���������Ϊ���°汾
	 `npm update` �� package.jsonʹ�ø��µİ汾���и���
	 `npm update --no-save`������package.json
	 `npm outdated`  ����ʱ�������
	 [npm outdated](https://juejin.cn/post/6844903960784961543)
10. npm ������汾����
	```bash
	���а汾����3λ���֣�x.y.z
	��һλ����Ҫ�汾
	�ڶ��������Ǵ�Ҫ�汾
	����λ���ǲ����汾
	
	`~`��ƥ�������С�汾������������~1.2.3��ƥ������1.2.x�汾�����ǲ�����1.3.0
	`^`��ƥ�����µĴ�汾������������^1.2.3��ƥ������1.x.x�İ�������1.3.0�����ǲ�����2.0.0
	>�������ܱ���ָ���İ汾���ߵ��κΰ汾
	>=�������ܵ��ڻ������ָ���İ汾���κΰ汾
	<=�������ܵ��ڻ������ָ���İ汾���κΰ汾
	<�������ܵ�����ָ�����κΰ汾
	=�������ܸ�ȷ�а汾
	-�������ܸ��ְ汾������2.1.0 - 2.6.2
	||��������ס�����< 2.1 || > 2.6
	```
11. ж��npm�����
	```bash 
	npm uninstall <package-name>
	
	//ʹ��-S����--save��������ɾ��package.json�ļ��е�����
	npm uninstall -S <package-name>
	
	//�����������ǿ��������������ʹ��-D/--save-dev��־������ļ���ɾ��
	npm uninstall -D <package-name>
	
	//����������ȫ�ְ�װ�ģ�����Ҫ���-g/--global��־
	npm uninstall -g <package-name>
	```
12. npmȫ�ֻ򱾵������
	ͨ���������������Ӧ���ڱ��ذ�װ��
	���ù�ָ�������ʲô��ֻҪ�ṩָ��İ�������ʹ��ȫ�ְ�װ��������������ṩһ�����ܣ����ڽ��ĳһ���󣬽��鰲װ�ɱ��ذ���
	ʹ��`npm list -g --depth 0`���鿴ȫ�ְ�װ��
13. ��װ
`npm install` ��װ��������
`npm install --production` ��װ��������
`npm install xx --save` ��װXX��������������
`npm install --save-dev` ��װXX��������������
14. npx Node.js��������
 **�������б�������**��Node.js������Ա��ȥͨ�����������ִ�������Ϊȫ�ְ�����ʹ��������λ��·���в���ִ�С������С���`npx commandname`�Զ���`node_modules`��Ŀ���ļ������ҵ��������ȷ���ã�������֪��ȷ�е�·����Ҳ����Ҫ��ȫ�ֺ��û�·���а�װ�������
**���谲װ������ִ��**��`npx cowsay "Hello"`