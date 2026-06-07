select  Person.email as Email
from Person
group by Person.email
having count(*)>1