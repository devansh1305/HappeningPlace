all: update_repo commit_changes push_repo

test:
	@echo "\033[92mHello World\033[0m"	

update_repo:
	@echo "\033[92mUpdating Repo...\033[0m"
	git pull

commit_changes:
	@echo "\033[92mShowing Status:\033[0m"	
	git status
	@echo "\033[92mAdding all the changed files:\033[0m"	
	git add .
	@echo "\033[92mCommitting in progress...\033[0m"	
	@read -p "Enter Commit message: " commit_var; \
	git commit -m "$$commit_var" 

push_repo:
	@echo "\033[92mPushing repo...\033[0m"	
	git push
	@echo "\033[92mHave a nice day :) \033[0m"	
