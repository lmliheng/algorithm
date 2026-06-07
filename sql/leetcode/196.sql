delete from Person a
using Person b 
where a.id>b.id and a.email=b.email